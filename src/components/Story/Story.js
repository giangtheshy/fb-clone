import React, { useState, useEffect } from "react";
import "./Story.scss";
import { BsFillPlusCircleFill, BsFillImageFill } from "react-icons/bs";
import { useGlobalContext } from "../../context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { VscChromeClose } from "react-icons/vsc";
import db, { storage } from "../../firebase";
const Story = () => {
  const { users, user } = useGlobalContext();
  const [modal, setModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [stories, setStories] = useState(null);
  const openModalAvatar = () => {
    setModal(!modal);
    setImage(null);
    setProgress(0);
  };
  useEffect(() => {
    db.collection("stories")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => setStories(snapshot.docs.map((doc) => doc.data())));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      db.collection("stories").add({
        image: image,
        uid: user.uid,
        displayName: user.displayName,
        id: new Date().getTime().toString(),
        photoURL: user.photoURL,
      });
    }
    setModal(!modal);
  };
  const handleChangeFile = (e) => {
    const value = e.target.files[0];
    if (value) {
      const uploadTask = storage.ref(`stories/${value.name}`).put(value);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => console.log(error),
        () => {
          storage
            .ref("stories")
            .child(value.name)
            .getDownloadURL()
            .then((url) => {
              setImage(url);
            });
        }
      );
    }
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  if (!stories) {
    return <></>;
  }
  return (
    <section className="stories">
      {modal && (
        <section className="modal-change-avatar-overlay">
          <aside className="modal-story">
            <button className="close-modal" onClick={() => setModal(!modal)}>
              <VscChromeClose />
            </button>
            <h1>Create Story</h1>
            <div className="img-container">
              {image && (
                <div className="img">
                  <img src={image} alt="avatar" />
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {progress !== 100 && (
                  <>
                    {progress > 0 && <input type="range" min="0" max="100" value={progress} />}
                    <label htmlFor="file" className="input-file">
                      <span>
                        Create with Image <BsFillImageFill />
                      </span>
                      <input type="file" onChange={handleChangeFile} id="file" />
                    </label>
                  </>
                )}
                <button className="submit" type="submit">
                  Confirm
                </button>
              </form>
            </div>
          </aside>
        </section>
      )}
      <Slider {...settings} style={{ boxSizing: "border-box" }}>
        <article className="story create-story-center" onClick={openModalAvatar}>
          <div
            className="background-img"
            style={{
              backgroundImage: `url(${
                users.find((item) => item.uid === user.uid)
                  ? users.find((item) => item.uid === user.uid).photoURL
                  : user.photoURL
              })`,
            }}
          >
            <span>
              <BsFillPlusCircleFill className="icon" />
            </span>
          </div>
          <div className="story__footer">
            <h3>Create</h3>
          </div>
        </article>
        {stories.map((story) => {
          return (
            <article className="story " key={story.id}>
              <div
                className="background-img"
                style={{
                  backgroundImage: `url(${story.image})`,
                }}
              >
                <img
                  src={
                    users.find((item) => item.uid === story.uid)
                      ? users.find((item) => item.uid === story.uid).photoURL
                      : story.photoURL
                  }
                  alt="avatar"
                  className="avatar"
                />
              </div>
              <h4>{story.displayName}</h4>
            </article>
          );
        })}
      </Slider>
    </section>
  );
};

export default Story;

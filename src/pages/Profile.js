import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";
import { HiPencil, HiEye, HiOutlineSearch, HiOutlineDotsHorizontal } from "react-icons/hi";
import { ImCamera } from "react-icons/im";
import { VscChromeClose } from "react-icons/vsc";
import MessengeSender from "../components/MessengeSender/MessengeSender";
import Feed from "../components/Feed/Feed";
import "./Profile.scss";
import db, { storage } from "../firebase";

const Profile = () => {
  const { id } = useParams();
  const { users, dataPost, user } = useGlobalContext();
  const [userProfile, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  useEffect(() => {
    const temp = users.find((item) => {
      if (item.uid === id) {
        return item.uid === id;
      }
    });
    setUser(temp);
  }, [users, id]);
  const openModalAvatar = () => {
    setModal(!modal);
    setImage(null);
    setProgress(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      db.collection("users").doc(`${userProfile.uid}`).update({ photoURL: image });
      db.collection("users")
        .doc(`${userProfile.uid}`)
        .get((doc) => setUser(doc.data()));
    }
    setModal(!modal);
  };
  const handleChangeFile = (e) => {
    const value = e.target.files[0];
    if (value) {
      const uploadTask = storage.ref(`avatars/${value.name}`).put(value);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => console.log(error),
        () => {
          storage
            .ref("avatars")
            .child(value.name)
            .getDownloadURL()
            .then((url) => {
              setImage(url);
            });
        }
      );
    }
  };
  if (!userProfile) {
    return <Loading />;
  }
  return (
    <section className="profile-section">
      {modal && (
        <section className="modal-change-avatar-overlay">
          <aside className="modal-change-avatar">
            <button className="close-modal" onClick={() => setModal(!modal)}>
              <VscChromeClose />
            </button>
            <h1>Update Avatar</h1>
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
                      <span>Upload Image</span>
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
          <div className="modal-footer"></div>
        </section>
      )}
      <div className="header-profile">
        <div className="header-top">
          <img src={userProfile.photoURL} alt="background" className="image-background" />
          <div className="avatar-center">
            <img src={userProfile.photoURL} alt="avatar" className="avatar" />
            {user.uid === userProfile.uid && (
              <span className="icon" onClick={openModalAvatar}>
                <ImCamera />
              </span>
            )}
          </div>
        </div>
        <div className="header-center">
          <h1>{userProfile.displayName}</h1>
          <p className="caption">What does the fox say?</p>
          <p className="caption">Shape of you </p>
        </div>
        <div className="header-bot">
          <ul className="option">
            <li>Posts</li>
            <li>Introduce</li>
            <li>Images</li>
            <li>Friends</li>
          </ul>
          <div className="btn-container">
            <button className="edit">
              <span className="icon">
                <HiPencil />
              </span>{" "}
              Edit
            </button>
            <button className="view">
              <span className="icon">
                <HiEye />
              </span>
            </button>
            <button className="search">
              <span className="icon">
                <HiOutlineSearch />
              </span>
            </button>
            <button className="more">
              <span className="icon">
                <HiOutlineDotsHorizontal />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="profile-content">
        <aside className="profile-left-side">
          <h2>Friends List</h2>
          <h6>{userProfile.friends.length} friends</h6>
          <div className="left-side-content" id="friends">
            {userProfile.friends.map((item) => {
              return (
                <article className="friend-center" key={item.uid}>
                  <Link to={`/profile/${item.uid}`}>
                    <img
                      src={
                        users.find((i) => i.uid === item.uid)
                          ? users.find((i) => i.uid === item.uid).photoURL
                          : item.photoURL
                      }
                      alt="avatar"
                      className="avatar"
                    />
                  </Link>
                  <h4>{item.displayName}</h4>
                </article>
              );
            })}
          </div>
        </aside>
        <div className="content">
          <MessengeSender />
          <Feed dataPost={dataPost.filter((post) => post.data.uid === id)} />
        </div>
      </div>
    </section>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { BsCameraVideoFill, BsImages } from "react-icons/bs";
import { MdSentimentVerySatisfied } from "react-icons/md";
import "./MessengeSender.scss";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
import { storage } from "../../firebase";
const MessengeSender = () => {
  const { user, users } = useGlobalContext();
  const [valueText, setValueText] = useState("");
  const [valueUrl, setValueUrl] = useState(null);
  const [progress, setProgress] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      uid: user.uid,
      avatar: users.find((item) => item.uid === user.uid).photoURL,
      image: valueUrl,
      url: valueText.match(/(https?:\/\/[^\s]+)/g),
      text: valueText.replace(/(https?:\/\/[^\s]+)/g, ""),
      username: user.displayName,
      time: new Date().getTime(),
      comments: [],
      like: 0,
    });
    setValueText("");
    setValueUrl("");
  };

  const handleChangeFile = (e) => {
    const image = e.target.files[0];
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => console.log(error),
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setValueUrl({ url: url, name: `images/${image.name}` });
            });
        }
      );
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [progress]);
  if (users.length === 0) {
    return <></>;
  }
  return (
    <section className="messenge-container">
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <img
            src={
              users.find((item) => item.uid === user.uid)
                ? users.find((item) => item.uid === user.uid).photoURL
                : user.photoURL
            }
            alt="avatar"
            className="avatar"
          />
          <input
            type="text"
            value={valueText}
            onChange={(e) => setValueText(e.target.value)}
            className="input-text"
            placeholder="What do you think?"
          />

          <button className="submit" type="submit">
            submit
          </button>
        </div>

        <div className="messenge-sender-bottom">
          <div className="live">
            <span className="icon">
              <BsCameraVideoFill />
            </span>
            <h4>Live stream</h4>
          </div>

          <label htmlFor="image" className="image">
            {progress && <span className="progress">{progress}%</span>}
            <span className="icon">
              <input type="file" id="image" onChange={handleChangeFile} />
              <BsImages />
            </span>
            <h4>Images</h4>
          </label>
          <div className="feeling">
            <span className="icon">
              <MdSentimentVerySatisfied />
            </span>
            <h4>Feeling/Action</h4>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MessengeSender;

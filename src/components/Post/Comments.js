import React, { useState } from "react";
import { BsImages } from "react-icons/bs";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";
const Comments = ({ comments, id }) => {
  const [valueText, setValueText] = useState("");
  const [valueUrl, setValueUrl] = useState("");
  const [showInputUrl, setShowInputUrl] = useState(false);
  const { user, users } = useGlobalContext();
  const { displayName, uid } = user;
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentsList = {
      avatar: users.find((item) => item.uid === user.uid).photoURL,
      name: displayName,
      image: valueUrl,
      text: valueText,
      id: new Date().getTime().toString(),
      uid: uid,
    };
    db.collection("posts")
      .doc(`${id}`)
      .update({ comments: firebase.firestore.FieldValue.arrayUnion(commentsList) });
    setValueText("");
    setValueUrl("");
  };
  return (
    <div className="comments-container">
      <form onSubmit={handleSubmit}>
        <img src={users.find((item) => item.uid === user.uid).photoURL} alt="avatar" className="avatar" />
        <label htmlFor="inputValue" className="input-box">
          <input
            type="text"
            value={valueText}
            onChange={(e) => setValueText(e.target.value)}
            className="input-text"
            placeholder="Enter Your Comment"
            id="inputValue"
          />
          <label onClick={() => setShowInputUrl(!showInputUrl)}>
            <BsImages />
          </label>
        </label>
        <button className="submit"></button>
        {showInputUrl ? (
          <input
            type="text"
            value={valueUrl}
            onChange={(e) => setValueUrl(e.target.value)}
            className="input-url"
            placeholder="Img url"
          />
        ) : null}
      </form>
      <div className="comments-center">
        {comments
          ? comments.map((comment) => {
              return (
                <div className="comment" key={comment.id}>
                  <div className="comment-body">
                    <Link to={`/profile/${comment.uid}`}>
                      <img
                        src={
                          users.find((item) => item.uid === comment.uid)
                            ? users.find((item) => item.uid === comment.uid).photoURL
                            : comment.avatar
                        }
                        alt="avatar"
                        className="avatar"
                      />
                    </Link>
                    <div className="comment-center">
                      <h4 className="name">{comment.name}</h4>
                      <div className="comment-content">
                        <p className="comment-text">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                  {comment.image ? <img src={comment.image} alt="img" className="comment-image" /> : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Comments;

import React, { useState } from "react";
import { BsImages } from "react-icons/bs";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
import firebase from "firebase";
const Comments = ({ comments, id }) => {
    const [valueText, setValueText] = useState("");
    const [valueUrl, setValueUrl] = useState("");
    const [showInputUrl, setShowInputUrl] = useState(false);
    const { user } = useGlobalContext();
    const { photoURL, displayName } = user;
    const handleSubmit = (e) => {
        e.preventDefault();
        const commentsList = {
            avatar: photoURL,
            name: displayName,
            image: valueUrl,
            text: valueText,
            id: new Date().getTime().toString(),
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
                <img src={photoURL} alt="avatar" className="avatar" />
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
                                      <img src={comment.avatar} alt="avatar" className="avatar" />
                                      <div className="comment-center">
                                          <h4 className="name">{comment.name}</h4>
                                          <div className="comment-content">
                                              <p className="comment-text">{comment.text}</p>
                                          </div>
                                      </div>
                                  </div>
                                  {comment.image ? (
                                      <img src={comment.image} alt="img" className="comment-image" />
                                  ) : null}
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Comments;

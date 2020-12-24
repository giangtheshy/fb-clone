import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import "./Post.scss";
import Comments from "./Comments";
import db from "../../firebase";
import firebase from "firebase";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";
import Microlink from "@microlink/react";
import { storage } from "../../firebase";
const Post = ({ avatar, username, image, text, time, comments, id, like, uid, url }) => {
  const [showComment, setShowComment] = useState(false);
  const [isLike, setIsLike] = useState(true);
  const { user, users } = useGlobalContext();
  const newTime = new Date().getTime() - time;
  const handleClickLike = () => {
    if (isLike) {
      db.collection("posts")
        .doc(`${id}`)
        .update({ like: firebase.firestore.FieldValue.increment(1) });
    } else {
      db.collection("posts")
        .doc(`${id}`)
        .update({ like: firebase.firestore.FieldValue.increment(-1) });
    }
    setIsLike(!isLike);
  };
  const handleClickRemovePost = () => {
    if (user.uid === uid) {
      db.collection("posts").doc(`${id}`).delete();
      if (image) {
        storage
          .ref()
          .child(image.name)
          .delete()
          .then(() => {
            console.log("success");
          })
          .catch(() => {
            console.log("error");
          });
      }
    } else {
      alert("you can't remove this post");
    }
  };
  return (
    <article className="post">
      <div className="post-header">
        <Link to={`/profile/${uid}`}>
          <img
            src={users.find((item) => item.uid === uid) ? users.find((item) => item.uid === uid).photoURL : avatar}
            alt="avatar"
            className="avatar"
          />
        </Link>
        <div className="info-header">
          <h4>{username}</h4>
          <div className="time-post">
            {Math.floor(newTime / (1000 * 60 * 60 * 24 * 30)) >= 1
              ? `${Math.floor(newTime / (1000 * 60 * 60 * 24))} months ago`
              : Math.floor(newTime / (1000 * 60 * 60 * 24)) >= 1
              ? `${Math.floor(newTime / (1000 * 60 * 60 * 24))} days ago`
              : Math.floor(newTime / (1000 * 60 * 60)) >= 1
              ? `${Math.floor(newTime / (1000 * 60 * 60))} hours ago`
              : Math.floor(newTime / (1000 * 60)) >= 1
              ? `${Math.floor(newTime / (1000 * 60))} minutes ago`
              : "Just now"}
          </div>
        </div>
        <button className="remove-post" onClick={handleClickRemovePost}>
          <FaTimes />
        </button>
      </div>
      <div className="text">{text}</div>
      {url && <Microlink url={url[0]} size="large" />}
      {/* {url && <ReactTinyLink cardSize="small" showGraphic={true} maxLine={2} minLine={1} url={url[0]} onPlay={true} />} */}
      <div className="img">{!image ? null : <img src={image.url} alt="avatar" />}</div>
      <div className="option">
        <div className="liked">
          {like > 0 ? (
            <>
              <span className="icon">
                <AiFillLike />
              </span>{" "}
              {like}
            </>
          ) : null}
        </div>
        <div className="commented">{comments && comments.length > 0 ? `${comments.length} Comments` : null} </div>
        <div className={`like ${isLike ? null : " active"}`} onClick={handleClickLike}>
          <span className="icon">{isLike ? <AiOutlineLike /> : <AiFillLike />}</span>
          <h4>Like</h4>
        </div>
        <div className="comment" onClick={() => setShowComment(!showComment)}>
          <span className="icon">
            <GoComment />
          </span>
          <h4>Comment</h4>
        </div>
        <div className="share">
          <span className="icon">
            <RiShareForwardFill />
          </span>
          <h4>Share</h4>
        </div>
      </div>

      {showComment && <Comments comments={comments} id={id} />}
    </article>
  );
};

export default Post;

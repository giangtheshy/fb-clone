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

const Post = ({ avatar, username, image, text, time, comments, id, like, uid }) => {
    const [showComment, setShowComment] = useState(false);
    const [isLike, setIsLike] = useState(true);
    const { user } = useGlobalContext();
    const convertTime = () => {
        const date = new Date(time);
        const dateString = `${date.getDate() + 1}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return dateString;
    };
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
            console.log(uid);
            db.collection("posts").doc(`${id}`).delete();
        } else {
            alert("you can't remove this post");
        }
    };
    return (
        <article className="post">
            <div className="post-header">
                <img src={avatar} alt="avatar" className="avatar" />
                <h4>{username}</h4>
                <button className="remove-post" onClick={handleClickRemovePost}>
                    <FaTimes />
                </button>
            </div>
            <div className="time-post">{convertTime()}</div>
            <div className="text">{text}</div>
            <div className="img">{image === "" ? null : <img src={image} alt="avatar" />}</div>

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
                <div className="commented">
                    {comments && comments.length > 0 ? `${comments.length} Comments` : null}{" "}
                </div>
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

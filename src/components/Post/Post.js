import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardFill } from "react-icons/ri";
import "./Post.scss";

const Post = ({ avatar, username, image, text, time }) => {
    const convertTime = () => {
        const date = new Date(time);
        const dateString = `${date.getDate() + 1}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return dateString;
    };

    return (
        <article className="post">
            <div className="post-header">
                <img src={avatar} alt="avatar" className="avatar" />
                <h4>{username}</h4>
            </div>
            <div className="time-post">{convertTime()}</div>
            <div className="text">{text}</div>
            <div className="img">{image === "" ? null : <img src={image} alt="avatar" />}</div>
            <div className="option">
                <div className="like">
                    <span className="icon">
                        <AiOutlineLike />
                    </span>
                    <h4>Like</h4>
                </div>
                <div className="comment">
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
        </article>
    );
};

export default Post;

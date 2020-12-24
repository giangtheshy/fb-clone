import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RiShareForwardFill } from "react-icons/ri";
import { BiPlayCircle } from "react-icons/bi";
import { useGlobalContext } from "../../context";

const Video = ({ id: { videoId }, snippet: { channelTitle, description, publishTime, thumbnails, title } }) => {
    const { getCurrentVideo, changeShowModal, getCurrentPosition } = useGlobalContext();
    const handleClick = () => {
        getCurrentVideo(videoId);
        changeShowModal();
        getCurrentPosition(window.pageYOffset);
    };

    return (
        <article className="video-center">
            <div className="video-header">
                <img src={thumbnails.default.url} alt={channelTitle} className="avatar" />
                <div className="video-header-right">
                    <h3>{channelTitle}</h3>
                    <p>{publishTime}</p>
                </div>
            </div>
            <div className="video-center">
                <h4>{title}</h4>
                <p className="desc">{description}</p>
            </div>
            <div className="video-content">
                <img src={thumbnails.high.url} alt={title} />
                <div className="overlay-content" onClick={handleClick}>
                    <span className="icon">
                        <BiPlayCircle />
                    </span>
                </div>
            </div>
            <div className="video-footer">
                <div className="footer-left">
                    <span className="icon">
                        <AiOutlineLike />
                        Like
                    </span>
                    <span className="icon">
                        <GoComment /> Comment
                    </span>
                    <span className="icon">
                        <RiShareForwardFill /> Share
                    </span>
                </div>
                <div className="footer-right">
                    <span className="icon">
                        <AiFillLike />
                    </span>
                    <p>Somebody commented</p>
                </div>
            </div>
        </article>
    );
};

export default Video;

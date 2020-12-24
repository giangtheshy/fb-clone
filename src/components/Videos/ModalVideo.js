import React from "react";
import { useGlobalContext } from "../../context";
import { FaTimes } from "react-icons/fa";
const ModalVideo = () => {
  const { currentVideo, changeShowModal, currentPosition } = useGlobalContext();
  const url = `https://www.youtube.com/embed/${currentVideo}`;
  const handleClick = () => {
    changeShowModal();
    setTimeout(() => {
      window.scrollTo({ top: currentPosition });
    }, 100);
  };
  return (
    <section className="modal-overlay">
      <div className="video-wrapper">
        <iframe src={url} allowFullScreen title="Video"></iframe>
      </div>
      <button onClick={handleClick}>
        <FaTimes />
      </button>
    </section>
  );
};

export default ModalVideo;

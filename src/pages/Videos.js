import React, { useCallback, useState } from "react";
import ModalVideo from "../components/Videos/ModalVideo";
import Video from "../components/Videos/Video";
import { useGlobalContext } from "../context";
import "../components/Videos/Videos.scss";

const Videos = () => {
  const { listVideos, showModal } = useGlobalContext();
  const [page, setPage] = useState(5);
  window.onscroll = useCallback(() => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((pages) => pages + 5);
    }
  }, [page]);
  return (
    <section className="videos-section">
      {listVideos.length > 0 &&
        listVideos.map((video, index) => {
          if (index <= page) {
            return <Video key={video.id.videoId} {...video} />;
          }
        })}
      {showModal && <ModalVideo />}
    </section>
  );
};

export default Videos;

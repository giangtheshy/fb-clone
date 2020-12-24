import React, { useState } from "react";
import Post from "../Post/Post";
import "./Feed.scss";
import Loading from "../Loading";
const Feed = ({ dataPost }) => {
  const [page, setPage] = useState(5);
  window.onscroll = () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((pages) => pages + 5);
    }
  };
  if (dataPost.length === 0) {
    return <Loading />;
  }
  return (
    <section className="feed-container">
      {dataPost.map((item, index) => {
        if (index <= page) {
          return <Post key={item.id} {...item.data} id={item.id} />;
        }
      })}
    </section>
  );
};

export default Feed;

import React from "react";
import Post from "../Post/Post";
import "./Feed.scss";
import { useGlobalContext } from "../../context";
const Feed = () => {
    const { dataPost } = useGlobalContext();
    if (dataPost.length === 0) {
        return <h1>Loading...</h1>;
    }
    return (
        <section className="feed-container">
            {dataPost.map((item) => {
                return <Post key={item.id} {...item.data} id={item.id} />;
            })}
        </section>
    );
};

export default Feed;

import React from "react";
import MessengeSender from "../components/MessengeSender/MessengeSender";
import Story from "../components/Story/Story";
import Feed from "../components/Feed/Feed";
import { useGlobalContext } from "../context";
const Home = () => {
    const { dataPost } = useGlobalContext();
    return (
        <>
            <Story />
            <MessengeSender />
            <Feed dataPost={dataPost} />
        </>
    );
};

export default Home;

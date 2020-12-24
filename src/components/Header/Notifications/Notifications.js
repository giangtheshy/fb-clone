import React from "react";
import { useGlobalContext } from "../../../context";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Noti from "./Noti";
const Notifications = () => {
    const { dataPost } = useGlobalContext();
    return (
        <aside className="notifications-box">
            <div className="notification-header">
                <h2>Notifications</h2>
                <span className="icon-noti">
                    <BiDotsHorizontalRounded />
                </span>
            </div>
            <div className="notifications-container">
                {dataPost.map((post) => {
                    return <Noti key={post.id} {...post.data} />;
                })}
            </div>
        </aside>
    );
};

export default Notifications;

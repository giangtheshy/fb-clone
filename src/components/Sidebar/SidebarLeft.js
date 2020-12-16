import React from "react";
import { FaStore, FaUserFriends } from "react-icons/fa";
import { BsCollectionPlayFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import "./Sidebar.scss";
import { useGlobalContext } from "../../context";
const SidebarLeft = () => {
    const { user } = useGlobalContext();
    return (
        <aside className="sidebar-left">
            <div className="item-sidebar">
                <img src={user.photoURL} alt="avatar" className="avatar" />
                <h4>{user.displayName}</h4>
            </div>
            <div className="item-sidebar">
                <span className="icon">
                    <FaUserFriends />
                </span>
                <h4>Friends</h4>
            </div>
            <div className="item-sidebar">
                <span className="icon">
                    <BsCollectionPlayFill />
                </span>
                <h4>Video</h4>
            </div>
            <div className="item-sidebar">
                <span className="icon">
                    <FaStore />
                </span>
                <h4>Marketplace</h4>
            </div>
            <div className="item-sidebar">
                <span className="icon">
                    <TiGroup />
                </span>
                <h4>Groups</h4>
            </div>
        </aside>
    );
};

export default SidebarLeft;

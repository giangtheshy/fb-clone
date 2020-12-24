import React, { useState } from "react";
import { useGlobalContext } from "../../../context";
import ChatMess from "./ChatMess";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdZoomOutMap } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
const MessBox = () => {
    const { listRoom } = useGlobalContext();
    const [value, setValue] = useState("");
    return (
        <aside className="mess-box">
            <div className="header-mess">
                <h2>Messenger</h2>
                <div className="icon-mess-center">
                    <span className="icon-tool-mess">
                        <BiDotsHorizontalRounded />
                    </span>
                    <span className="icon-tool-mess">
                        <MdZoomOutMap />
                    </span>
                    <span className="icon-tool-mess">
                        <FiEdit />
                    </span>
                </div>
            </div>
            <form>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search in Messenger ..."
                />
            </form>
            <div className="message-container">
                {listRoom.map((room) => {
                    return <ChatMess key={room.id} {...room} />;
                })}
            </div>
        </aside>
    );
};

export default MessBox;

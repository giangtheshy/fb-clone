import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context";

const Noti = ({ uid, avatar, username, text, time }) => {
    const { user, users } = useGlobalContext();
    const [mySelf, setMySelf] = useState(null);
    useEffect(() => {
        setMySelf(users.find((item) => item.uid === user.uid));
    }, []);

    if (!mySelf) {
        return <></>;
    }
    const newTime = new Date().getTime() - time;
    return (
        <>
            {mySelf.friends.some((item) => item.uid === uid) && (
                <div className="notification-center">
                    <img src={avatar} alt="avatar" className="avatar" />
                    <div className="notification-content">
                        <div className="content-top">
                            <h4>{username}</h4>
                            <h6>
                                {Math.floor(newTime / (1000 * 60 * 60 * 24 * 30)) >= 1
                                    ? `${Math.floor(newTime / (1000 * 60 * 60 * 24))} months ago`
                                    : Math.floor(newTime / (1000 * 60 * 60 * 24)) >= 1
                                    ? `${Math.floor(newTime / (1000 * 60 * 60 * 24))} days ago`
                                    : Math.floor(newTime / (1000 * 60 * 60)) >= 1
                                    ? `${Math.floor(newTime / (1000 * 60 * 60))} hours ago`
                                    : Math.floor(newTime / (1000 * 60)) >= 1
                                    ? `${Math.floor(newTime / (1000 * 60))} minutes ago`
                                    : "Just now"}
                            </h6>
                        </div>
                        <p>
                            <span style={{ color: "  rgb(161, 160, 160)" }}>{username} posted : </span>
                            {text}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Noti;

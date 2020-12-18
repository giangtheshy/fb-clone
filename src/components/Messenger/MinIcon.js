import React, { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
const MinIcon = ({ room }) => {
    const [friend, setFriend] = useState(null);
    const { user, changeMinimized, stateMinimize } = useGlobalContext();
    // const showRoom = (room) => {
    //     db.collection("rooms").doc(room.id).update({ isMinimized: false });
    // };
    const tempFunc = useCallback(() => {}, [room]);
    useEffect(() => {
        setFriend(...room.owner.filter((item) => item.uid !== user.uid));
        tempFunc();
    }, []);
    console.log(stateMinimize);
    if (!friend) {
        return <></>;
    }
    return (
        <>
            {room.show && stateMinimize.find((state) => state.id === room.id).isMinimized === true && (
                <div className="img-icon" onClick={() => changeMinimized(room.id)}>
                    <img src={friend.photoURL} alt="avatar" className="avatar" />
                </div>
            )}
        </>
    );
};

export default MinIcon;

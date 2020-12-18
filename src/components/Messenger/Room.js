import React, { useState, useEffect } from "react";
import { VscChromeMinimize } from "react-icons/vsc";
import { RiCloseLine, RiSendPlaneFill, RiEmotionHappyLine } from "react-icons/ri";
import { BsImageFill, BsPlusCircleFill } from "react-icons/bs";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
import firebase from "firebase";
const Room = ({ room, sendMess }) => {
    const [valueMess, setValueMess] = useState("");
    const [friend, setFriend] = useState(null);
    const [isMinimized, setIsMinimized] = useState(true);
    const { user, concatRoomID, changeMinimized, stateMinimize } = useGlobalContext();
    useEffect(() => {
        setFriend(...room.owner.filter((item) => item.uid !== user.uid));
    }, []);
    // const minimizeRoom = (room) => {
    //     db.collection("rooms").doc(room.id).update({ isMinimized: true });
    // };
    const handleSendMessage = (e) => {
        e.preventDefault();

        db.collection("rooms")
            .doc(`${concatRoomID(user, friend)}`)
            .update({
                messenger: firebase.firestore.FieldValue.arrayUnion({
                    id: new Date().getTime().toString(),
                    uid: user.uid,
                    mess: valueMess,
                    photoURL: user.photoURL,
                }),
            });
        setValueMess("");
    };
    console.log("room");
    if (!friend) {
        return <></>;
    }
    return (
        <>
            {room.show && stateMinimize.find((state) => state.id === room.id).isMinimized === false && (
                <article className="room-container">
                    <div className="header-room">
                        <div className="header-left">
                            <img src={friend.photoURL} alt="avatar" className="avatar" />
                            <h4 className="name">{friend.displayName}</h4>
                        </div>
                        <div className="header-right">
                            <button className="minimize" onClick={() => changeMinimized(room.id)}>
                                <VscChromeMinimize className="icon" />
                            </button>
                            <button className="close">
                                <RiCloseLine className="icon" />
                            </button>
                        </div>
                    </div>
                    <div className="messenger-container">
                        {room.messenger.map((item, index) => {
                            return (
                                <div className={`mess-center ${item.uid === user.uid && "myself"}`} key={index}>
                                    <img src={item.photoURL} alt="avatar" className="avatar" />
                                    <p className="mess-text">{item.mess}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="footer-room">
                        <form onSubmit={handleSendMessage}>
                            <span className="add-image">
                                <BsImageFill />
                            </span>
                            <span className="add-any">
                                <BsPlusCircleFill />
                            </span>
                            <label>
                                <input
                                    type="text"
                                    value={valueMess}
                                    onChange={(e) => setValueMess(e.target.value)}
                                    placeholder="Aa..."
                                />
                                <span className="emoji">
                                    <RiEmotionHappyLine />
                                </span>
                            </label>
                            <button className="send" type="submit">
                                <RiSendPlaneFill />
                            </button>
                        </form>
                    </div>
                </article>
            )}
        </>
    );
};

export default Room;

import React, { useState, useEffect, useRef } from "react";
import { VscChromeMinimize } from "react-icons/vsc";
import { RiCloseLine, RiSendPlaneFill, RiEmotionHappyLine } from "react-icons/ri";
import { BsImageFill, BsPlusCircleFill } from "react-icons/bs";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
import firebase from "firebase";
import useAudio from "../../Hook/useAudio";
const Room = ({ room }) => {
  const [valueMess, setValueMess] = useState("");
  const [friend, setFriend] = useState(null);
  const messageContainer = useRef(null);
  const { user, concatRoomID, changeMinimized, stateMinimize, users } = useGlobalContext();
  const [playing, toggle] = useAudio();
  useEffect(() => {
    setFriend(...room.owner.filter((item) => item.uid !== user.uid));
  }, []);
  useEffect(() => {
    if (messageContainer.current) {
      scrollToBottom();
    }
    if (room.ring) {
      if (room.ring.status === true && stateMinimize.find((state) => state.id === room.id).isMinimized === true) {
        toggle();
      }
    }
  }, [room.messenger, stateMinimize]);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (valueMess !== "") {
      db.collection("rooms")
        .doc(`${concatRoomID(user, friend)}`)
        .update({
          messenger: firebase.firestore.FieldValue.arrayUnion({
            id: new Date().getTime().toString(),
            uid: user.uid,
            mess: valueMess,
            photoURL: users.find((item) => item.uid === user.uid).photoURL,
          }),
          ring: { id: room.id, status: true },
        });
      setTimeout(() => {
        db.collection("rooms")
          .doc(`${concatRoomID(user, friend)}`)
          .update({
            ring: { id: room.id, status: false },
          });
      }, 2000);
      setValueMess("");
    }
  };
  const scrollToBottom = () => messageContainer.current.scrollIntoView();
  if (!friend || users.length === 0) {
    return <></>;
  }
  return (
    <>
      {room.show && stateMinimize.find((state) => state.id === room.id).isMinimized === false && (
        <article className="room-container">
          <div className="header-room">
            <div className="header-left">
              <img src={users.find((item) => item.uid === friend.uid).photoURL} alt="avatar" className="avatar" />
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
            <div className="introduce">
              <img src={users.find((item) => item.uid === friend.uid).photoURL} alt="avatar" className="avatar" />
              <h4>{friend.displayName}</h4>
              <p>You are friends on Facebook</p>
            </div>
            {room.messenger.map((item, index) => {
              return (
                <div className={`mess-center ${item.uid === user.uid && "myself"}`} key={index}>
                  <img
                    src={
                      users.find((u) => u.uid === item.uid)
                        ? users.find((u) => u.uid === item.uid).photoURL
                        : item.photoURL
                    }
                    alt="avatar"
                    className="avatar"
                  />
                  <p className="mess-text">{item.mess}</p>
                </div>
              );
            })}
            <div ref={messageContainer} />
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

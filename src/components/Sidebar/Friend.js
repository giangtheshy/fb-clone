import React from "react";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
const Friend = ({ friend }) => {
  const { concatRoomID, user, changeMinimized, users } = useGlobalContext();
  const handleClick = () => {
    db.collection("rooms")
      .doc(`${concatRoomID(friend, user)}`)
      .update({ show: true });
    changeMinimized(concatRoomID(friend, user));
  };
  return (
    <div className="friend-center" onClick={handleClick}>
      <img
        src={
          users.find((item) => item.uid === friend.uid)
            ? users.find((item) => item.uid === friend.uid).photoURL
            : friend.photoURL
        }
        alt="avatar"
        className="avatar"
      />
      <h4 className="name">{friend.displayName}</h4>
    </div>
  );
};

export default Friend;

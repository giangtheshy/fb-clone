import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context";
const ChatMess = ({ id, messenger, owner }) => {
  const { user, changeMinimized, users } = useGlobalContext();
  const [friend, setFriend] = useState(null);
  useEffect(() => {
    setFriend(...owner.filter((item) => item.uid !== user.uid));
  }, []);
  if (!friend || messenger.length === 0) {
    return <></>;
  }
  return (
    <div onClick={() => changeMinimized(id)} className="message-box">
      <img src={users.find((item) => item.uid === friend.uid).photoURL} alt="avatar" className="avatar" />
      <div className="mess-right">
        <h4>{friend.displayName}</h4>
        <p className="mess">
          <span className="owner-mess">
            {messenger[messenger.length - 1].uid === user.uid ? "You : " : `${friend.displayName} : `}
          </span>
          {messenger[messenger.length - 1].mess}
        </p>
      </div>
    </div>
  );
};

export default ChatMess;

import React, { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "../../context";

const MinIcon = ({ room }) => {
  const [friend, setFriend] = useState(null);
  const { user, changeMinimized, stateMinimize, users } = useGlobalContext();

  const tempFunc = useCallback(() => {}, [room]);
  useEffect(() => {
    setFriend(...room.owner.filter((item) => item.uid !== user.uid));
    tempFunc();
  }, []);
  if (!friend) {
    return <></>;
  }
  return (
    <>
      {room.show && stateMinimize.find((state) => state.id === room.id).isMinimized === true && (
        <div className="img-icon" onClick={() => changeMinimized(room.id)}>
          <img src={users.find((item) => item.uid === friend.uid).photoURL} alt="avatar" className="avatar" />
        </div>
      )}
    </>
  );
};

export default MinIcon;

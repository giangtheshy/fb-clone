import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import FriendRequest from "./FriendRequest";
import Friend from "./Friend";
const SidebarRight = () => {
  const { users, user } = useGlobalContext();
  const [friends, setFriends] = useState([]);
  const [showRequest, setShowRequest] = useState(true);
  useEffect(() => {
    if (users.length > 0 && users.find((item) => item.uid === user.uid)) {
      setFriends(users.find((item) => item.uid === user.uid).friends);
    }
  }, [users]);

  useEffect(() => {
    if (friends.length === users.length - 1) {
      setShowRequest(false);
    } else {
      setShowRequest(true);
    }
  }, [friends]);
  if (!friends || users.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <aside className="sidebar-right">
      {showRequest && (
        <>
          <h3>Request Friends</h3>
          <div className="request-wrapper">
            {users.find((item) => item.uid === user.uid) &&
              users
                .filter((itemU) => users.find((item) => item.uid === user.uid).others.some((i) => i === itemU.uid))
                .map((user) => {
                  return <FriendRequest key={user.uid} userFriend={user} />;
                })}
          </div>
        </>
      )}

      {friends.length > 0 && (
        <>
          <h3>Friends List</h3>
          <div className="friends-wrapper">
            {friends.map((friend) => {
              return <Friend key={friend.uid} friend={friend} />;
            })}
          </div>
        </>
      )}
    </aside>
  );
};

export default SidebarRight;

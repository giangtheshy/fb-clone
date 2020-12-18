import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
import firebase from "firebase";
const FriendRequest = ({ userFriend }) => {
    const [showRequest, setShowRequest] = useState(true);
    const { user, users, concatRoomID } = useGlobalContext();
    const handleClickConfirm = () => {
        if (userFriend.uid !== user.uid) {
            db.collection("users")
                .doc(`${user.uid}`)
                .update({
                    friends: firebase.firestore.FieldValue.arrayUnion(userFriend),
                    room: firebase.firestore.FieldValue.arrayUnion(concatRoomID(user, userFriend)),
                    others: users
                        .filter(
                            (item) => !users.find((u) => u.uid === user.uid).friends.some((i) => i.uid === item.uid)
                        )
                        .filter((item) => item.uid !== user.uid)
                        .map((item) => item.uid),
                });
            db.collection("users")
                .doc(`${userFriend.uid}`)
                .update({
                    friends: firebase.firestore.FieldValue.arrayUnion(users.find((item) => item.uid === user.uid)),
                    room: firebase.firestore.FieldValue.arrayUnion(concatRoomID(user, userFriend)),
                    others: users
                        .filter(
                            (item) => !users.find((u) => u.uid === user.uid).friends.some((i) => i.uid === item.uid)
                        )
                        .filter((item) => item.uid !== user.uid)
                        .map((item) => item.uid),
                });
            const { uid, photoURL, displayName } = user;
            db.collection("rooms")
                .doc(`${concatRoomID(user, userFriend)}`)
                .set({
                    id: concatRoomID(user, userFriend),
                    messenger: [],
                    show: false,
                    icon: userFriend.photoURL,
                    isMinimized: false,
                    owner: [{ uid, photoURL, displayName }, userFriend],
                });
        }
        setShowRequest(false);
    };

    useEffect(() => {
        if (user) {
            const tempUser = users.find((item) => item.uid === user.uid);
            const check = tempUser.friends.find((friend) => friend.uid === userFriend.uid);
            if (check) {
                setShowRequest(false);
            }
        }
    }, [user]);
    return (
        <>
            {showRequest && userFriend.uid !== user.uid && (
                <div className="request-container">
                    <div className="header-request">
                        <img src={userFriend.photoURL} alt="avatar" className="avatar" />
                        <h4>{userFriend.displayName}</h4>
                    </div>
                    <div className="bottom-request">
                        <button className="confirm-btn" onClick={handleClickConfirm}>
                            Confirm
                        </button>
                        <button className="remove-btn" onClick={() => setShowRequest(false)}>
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FriendRequest;

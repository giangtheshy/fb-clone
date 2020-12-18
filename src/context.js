import React, { useContext, useEffect, useState } from "react";
import db, { auth } from "./firebase";
import firebase from "firebase";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [dataPost, setDataPost] = useState([]);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [collectionRoom, setCollectionRoom] = useState([]);
    const [stateMinimize, setStateMinimized] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged((user) => setUser(user));
        db.collection("posts")
            .orderBy("time", "desc")
            .onSnapshot((snapshot) => setDataPost(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));

        db.collection("users").onSnapshot((snapshot) => setUsers(snapshot.docs.map((doc) => doc.data())));
        db.collection("rooms").onSnapshot((snapshot) => setCollectionRoom(snapshot.docs.map((doc) => doc.data())));
    }, []);
    useEffect(() => {
        if (users && users.length > 0 && user) {
            setRooms(users.find((item) => item.uid === user.uid).room);
        }
    }, [users]);
    useEffect(() => {
        if (rooms.length > 0) {
            const temp = rooms.map((room) => ({ id: room, isMinimized: true }));
            setStateMinimized(temp);
        }
    }, [rooms]);
    const changeMinimized = (id) => {
        const temp = stateMinimize.map((state) => {
            if (state.id === id) {
                return { ...state, isMinimized: !state.isMinimized };
            } else {
                return state;
            }
        });
        setStateMinimized(temp);
    };
    if (users && users.length > 0 && user) {
        db.collection("users")
            .doc(`${user.uid}`)
            .update({
                others: users
                    .filter((item) => !users.find((u) => u.uid === user.uid).friends.some((i) => i.uid === item.uid))
                    .filter((item) => item.uid !== user.uid)
                    .map((item) => item.uid),
            });
    }
    const setLoginUser = (user) => {
        setUser(user);
    };
    const concatRoomID = (user, friend) => {
        if (friend.uid > user.uid) {
            return `${user.uid}${friend.uid}`;
        } else {
            return `${friend.uid}${user.uid}`;
        }
    };

    return (
        <AppContext.Provider
            value={{
                dataPost,
                user,
                setLoginUser,
                users,
                concatRoomID,
                rooms,
                collectionRoom,
                changeMinimized,
                stateMinimize,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppProvider };

import React, { useContext, useEffect, useState } from "react";
import db from "./firebase";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [dataPost, setDataPost] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        db.collection("posts")
            .orderBy("time", "desc")
            .onSnapshot((snapshot) => setDataPost(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));
    }, []);
    const setLoginUser = (username) => {
        setUser(username);
    };
    return <AppContext.Provider value={{ dataPost, user, setLoginUser }}>{children}</AppContext.Provider>;
};
export const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppProvider };

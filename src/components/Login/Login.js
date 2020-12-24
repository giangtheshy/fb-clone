import React from "react";
import "./Login.scss";
import db, { auth, provider } from "../../firebase";
import { useGlobalContext } from "../../context";

const Login = () => {
    const { setLoginUser, users } = useGlobalContext();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(async (result) => {
                const { uid, photoURL, displayName } = result.user;
                const userLists = db.collection("users").doc(`${uid}`);
                const doc = await userLists.get();
                if (!doc.exists) {
                    userLists.set({
                        uid,
                        photoURL,
                        displayName,
                        friends: [],
                        room: [],
                        others: users.filter((item) => item.uid !== uid),
                        cart: [],
                    });
                }

                setLoginUser(result.user);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="login">
            <div className="login-logo">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
                    alt=""
                />
                <img src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="" />
            </div>
            <button type="submit" onClick={signIn}>
                Sign In
            </button>
        </div>
    );
};

export default Login;

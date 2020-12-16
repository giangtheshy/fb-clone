import React from "react";
import "./Login.scss";
import { auth, provider } from "../../firebase";
import { useGlobalContext } from "../../context";

const Login = () => {
    const { setLoginUser } = useGlobalContext();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => setLoginUser(result.user))
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

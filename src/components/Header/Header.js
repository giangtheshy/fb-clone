import React, { useState } from "react";
import { FaFacebook, FaFacebookMessenger, FaStore } from "react-icons/fa";
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { BsCollectionPlayFill, BsPlusCircle } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { TiGroup, TiArrowSortedDown } from "react-icons/ti";
import { SiNintendogamecube } from "react-icons/si";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useGlobalContext } from "../../context";
import "./Header.scss";
import { auth } from "../../firebase";

const Header = () => {
    const { user } = useGlobalContext();
    const [showOptionBox, setShowOptionBox] = useState(false);
    const signOutUser = () => {
        auth.signOut();
    };
    return (
        <header className="header">
            <div className="header-left">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
                    alt="face-logo"
                />
                <form>
                    <label>
                        <input type="text" name="input" />
                    </label>
                </form>
            </div>
            <div className="header-center">
                <span className="icon active">
                    <AiFillHome />
                </span>
                <span className="icon">
                    <BsCollectionPlayFill />
                </span>
                <span className="icon">
                    <FaStore />
                </span>
                <span className="icon">
                    <TiGroup />
                </span>
                <span className="icon">
                    <SiNintendogamecube />
                </span>
            </div>
            <div className="header-right">
                <img src={user.photoURL} alt="avatar" className="avatar" />
                <h3>{user.displayName}</h3>
                <span className="icon">
                    <AiOutlinePlus />
                </span>
                <span className="icon">
                    <FaFacebookMessenger />
                </span>
                <span className="icon">
                    <IoIosNotifications />
                </span>
                <span className="icon" onClick={() => setShowOptionBox(!showOptionBox)}>
                    <TiArrowSortedDown />
                    {showOptionBox && (
                        <div className="option-box">
                            <div className="info">
                                <img src={user.photoURL} alt="avatar" className="avatar__profile" />
                                <div>
                                    <h3 className="username">{user.displayName}</h3>
                                    <button className="profile">View Profile</button>
                                </div>
                            </div>
                            <div className="option-btn">
                                <button className="switch" onClick={signOutUser}>
                                    <HiOutlineSwitchHorizontal className="icon" />
                                    Switch Account
                                </button>
                                <button className="logout" onClick={signOutUser}>
                                    <FiLogOut className="icon" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </span>
            </div>
        </header>
    );
};

export default Header;

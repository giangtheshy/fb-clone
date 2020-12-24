import React, { useState } from "react";
import { FaFacebookMessenger, FaStore, FaBars } from "react-icons/fa";
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { BsCollectionPlayFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { TiGroup, TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useGlobalContext } from "../../context";
import "./Header.scss";
import { auth } from "../../firebase";
import MessBox from "./Chat/MessBox";
import Notifications from "./Notifications/Notifications";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user, users, changeShowBar, showBar } = useGlobalContext();
  const [showOptionBox, setShowOptionBox] = useState(false);
  const [showMessBox, setShowMessBox] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { uid } = user;
  const signOutUser = () => {
    auth.signOut();
  };
  const handleShowMessBox = () => {
    setShowMessBox(!showMessBox);
    setShowOptionBox(false);
    setShowNotifications(false);
  };
  const handleShowOptionBox = () => {
    setShowOptionBox(!showOptionBox);
    setShowMessBox(false);
    setShowNotifications(false);
  };
  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowOptionBox(false);
    setShowMessBox(false);
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
  };
  const usePathName = () => {
    const location = useLocation();
    return location.pathname;
  };
  const temp = usePathName();
  if (users.length === 0) {
    return <></>;
  }
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
            alt="face-logo"
          />
        </Link>
        <form onSubmit={handleSubmitSearch}>
          <label>
            <input type="text" name="input" placeholder="Search..." />
          </label>
        </form>
      </div>
      <span onClick={changeShowBar} className="btn-bar">
        <Link className={`icon-bar ${showBar && "active"} `}>
          <FaBars />
        </Link>
      </span>
      <div className="header-center">
        <span>
          <Link to="/" className={`icon ${temp === "/" && "active"} `}>
            <AiFillHome />
          </Link>
        </span>
        <span>
          <Link to="/videos" className={`icon ${temp === "/videos" && "active"} `}>
            <BsCollectionPlayFill />
          </Link>
        </span>
        <span>
          <Link to="/market" className={`icon ${temp === "/market" && "active"} `}>
            <FaStore />
          </Link>
        </span>
        <span>
          <Link to="/group" className={`icon ${temp === "/group" && "active"} `}>
            <TiGroup />
          </Link>
        </span>
      </div>
      <div className="header-right">
        <Link to={`/profile/${uid}`} className="profile-avatar">
          <img
            src={
              users.find((item) => item.uid === user.uid)
                ? users.find((item) => item.uid === user.uid).photoURL
                : user.photoURL
            }
            alt="avatar"
            className="avatar"
          />
        </Link>
        <h3 className="profile-avatar">{user.displayName}</h3>
        <span className="icon">
          <AiOutlinePlus />
        </span>
        <span className={`icon ${showMessBox && "active"}`} onClick={handleShowMessBox}>
          <FaFacebookMessenger className="icon__child" />
          {showMessBox && <MessBox />}
        </span>
        <span className={`icon ${showNotifications && "active"}`} onClick={handleShowNotifications}>
          <IoIosNotifications className="icon__child" />
          {showNotifications && <Notifications />}
        </span>
        <span className={`icon ${showOptionBox && "active"}`} onClick={handleShowOptionBox}>
          <TiArrowSortedDown className="icon__child" />
          {showOptionBox && (
            <div className="option-box">
              <div className="info">
                <img src={user.photoURL} alt="avatar" className="avatar__profile" />
                <div>
                  <h3 className="username">{user.displayName}</h3>
                  <Link to={`/profile/${uid}`}>
                    <button className="profile">View Profile</button>
                  </Link>
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

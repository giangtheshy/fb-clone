import React from "react";
import { FaStore, FaUserFriends } from "react-icons/fa";
import { BsCollectionPlayFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { HiShoppingCart, HiHeart } from "react-icons/hi";
import { MdRemoveShoppingCart } from "react-icons/md";
import "./Sidebar.scss";
import { useGlobalContext } from "../../context";
import { Link, useLocation } from "react-router-dom";
const SidebarLeft = ({ className }) => {
  const {
    user,
    products,
    filterProducts,
    handleCartState,
    cartState,
    users,
    showBar,
    changeShowBar,
  } = useGlobalContext();
  const usePathName = () => {
    const location = useLocation();
    return location.pathname;
  };
  const temp = usePathName();
  const handleClick = (e, item) => {
    e.target.classList.add("active");
    filterProducts(item);
  };
  const handleClickSelect = () => {
    changeShowBar();
  };
  if (users.length === 0) {
    return <></>;
  }
  return (
    <aside className={`sidebar-left ${temp === "/market" && "side-left-market"} ${showBar && "showBar"} ${className}`}>
      <div className="item-sidebar" onClick={handleClickSelect}>
        <Link to={`/profile/${user.uid}`}>
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
        <h4>{user.displayName}</h4>
      </div>
      <Link to={`/profile/${user.uid}`} className="item-sidebar" onClick={handleClickSelect}>
        <div className="link">
          <span className="icon">
            <FaUserFriends />
          </span>
          <h4>Friends</h4>
        </div>
      </Link>

      <Link to="/videos" className="item-sidebar" onClick={handleClickSelect}>
        <div className="link">
          <span className="icon">
            <BsCollectionPlayFill />
          </span>
          <h4>Video</h4>
        </div>
      </Link>
      <Link to="/market" className="item-sidebar" onClick={handleClickSelect}>
        <div className="link">
          <span className="icon">
            <FaStore />
          </span>
          <h4>Marketplace</h4>
        </div>
      </Link>
      <Link to="/group" className="item-sidebar" onClick={handleClickSelect}>
        <div className="link">
          <span className="icon">
            <TiGroup />
          </span>
          <h4>Groups</h4>
        </div>
      </Link>

      {temp === "/market" && (
        <>
          {cartState ? (
            <div className="item-sidebar__cart-open" onClick={handleCartState}>
              <span className="icon">
                <MdRemoveShoppingCart />
              </span>
              <h4>Close Cart</h4>
            </div>
          ) : (
            <div className="item-sidebar" onClick={handleCartState}>
              <span className="icon">
                <HiShoppingCart />
              </span>
              <h4>Shopping Cart</h4>
            </div>
          )}

          <div className="categories">
            <h3>Categories</h3>
            {["all", ...new Set(products.map((item) => item.category))].map((item, index) => {
              return (
                <button className="category-btn" onClick={(e) => handleClick(e, item)} key={index}>
                  <span className="icon">
                    <HiHeart />
                  </span>
                  {item}
                </button>
              );
            })}
          </div>
        </>
      )}
    </aside>
  );
};

export default SidebarLeft;

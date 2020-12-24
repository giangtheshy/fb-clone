import React from "react";
import { useGlobalContext } from "../../context";
import ItemCart from "./ItemCart";
import { FcPaid } from "react-icons/fc";
import { VscClearAll } from "react-icons/vsc";
const Cart = () => {
    const { cart, removeProductToCart, checkOutProduct } = useGlobalContext();
    return (
        <div className="cart-section">
            <h1 className="title">Cart</h1>
            <div className="item-cart-container">
                {cart.map((item) => {
                    return <ItemCart key={item.id} {...item} />;
                })}
            </div>
            <div className="cart-footer">
                <button className="clear" onClick={() => removeProductToCart()}>
                    <VscClearAll />
                    Clear All
                </button>
                <button className="checkout" onClick={() => checkOutProduct()}>
                    <FcPaid />
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;

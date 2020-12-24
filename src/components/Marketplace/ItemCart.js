import React from "react";
import { HiTrash } from "react-icons/hi";
import { useGlobalContext } from "../../context";
const ItemCart = ({ id, title, description, price, image, category, statusCheckout }) => {
    const { removeProductToCart } = useGlobalContext();
    return (
        <article className="item-cart">
            <div className="item-cart__header">
                <span className={`${statusCheckout ? "status-item paid" : "status-item"}`}>
                    {statusCheckout ? "PAID" : "HOLD"}
                </span>
                <h3>{title}</h3>
                <img src={image} alt={title} />
            </div>
            <div className="item-cart__content">
                <div className="info">
                    <h4 className="price">${price}</h4>
                    <h6>{category}</h6>
                </div>
                <div className="btn-center">
                    <button className="remove" onClick={() => removeProductToCart(id)}>
                        <HiTrash />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ItemCart;

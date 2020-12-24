import React, { useRef } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useGlobalContext } from "../../context";
const Product = ({ id, title, description, price, image, category }) => {
    const { addProductToCart, cart, handleCartState } = useGlobalContext();
    const productCenter = useRef(null);
    const handleClick = () => {
        if (cart.some((item) => item.id === id)) {
            handleCartState();
        } else {
            addProductToCart({ id, title, description, price, image, category, statusCheckout: false });
            productCenter.current.classList.add("success");
            setTimeout(() => {
                if (productCenter) {
                    productCenter.current.classList.remove("success");
                }
            }, 300);
        }
    };
    return (
        <article className="product-center" ref={productCenter} onClick={handleClick}>
            <div className="img-container">
                <div className="icon">
                    <HiOutlineCheckCircle />
                </div>
                <img src={image} alt={title} />
            </div>
            <div className="product-info">
                <h3 className="price">${price}</h3>
                <h5 className="title">{title}</h5>
                <p className="desc">{description}</p>
            </div>
        </article>
    );
};

export default Product;

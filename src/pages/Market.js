import React from "react";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";
import Product from "../components/Marketplace/Product";
import Cart from "../components/Marketplace/Cart";
import "./Market.scss";
const Market = () => {
    const { products, cartState } = useGlobalContext();
    if (products.length === 0) {
        return <Loading />;
    }

    return (
        <>
            {cartState ? (
                <Cart />
            ) : (
                <section className="market-section">
                    <h1 className="title-market">MarketPlace Facebook</h1>
                    <div className="products-container">
                        {products.map((product) => {
                            return <Product {...product} key={product.id} />;
                        })}
                    </div>
                </section>
            )}
        </>
    );
};

export default Market;

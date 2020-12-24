import React from "react";
import loading from "../loading.svg";
const Loading = () => {
    return (
        <div className="loading-container">
            <img src={loading} alt="loading" className="loading" />
        </div>
    );
};

export default Loading;

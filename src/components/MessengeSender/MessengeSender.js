import React, { useState } from "react";
import { BsCameraVideoFill, BsImages } from "react-icons/bs";
import { MdSentimentVerySatisfied } from "react-icons/md";
import "./MessengeSender.scss";
import { useGlobalContext } from "../../context";
import db from "../../firebase";
import firebase from "firebase";
const MessengeSender = () => {
    const { user } = useGlobalContext();
    const [valueText, setValueText] = useState("");
    const [valueUrl, setValueUrl] = useState("");
    const [showInputUrl, setShowInputUrl] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection("posts").add({
            uid: user.uid,
            avatar: user.photoURL,
            image: valueUrl,
            text: valueText,
            username: user.displayName,
            time: new Date().getTime(),
            comments: [],
            like: 0,
        });
        setValueText("");
        setValueUrl("");
    };
    return (
        <section className="messenge-container">
            <form onSubmit={handleSubmit}>
                <img src={user.photoURL} alt="avatar" className="avatar" />
                <input
                    type="text"
                    value={valueText}
                    onChange={(e) => setValueText(e.target.value)}
                    className="input-text"
                    placeholder="What do you think?"
                />
                {showInputUrl && (
                    <input
                        type="text"
                        value={valueUrl}
                        onChange={(e) => setValueUrl(e.target.value)}
                        className="input-url"
                        placeholder="image URL"
                    />
                )}
                <button className="submit" type="submit">
                    submit
                </button>
            </form>
            <div className="messenge-sender-bottom">
                <div className="live">
                    <span className="icon">
                        <BsCameraVideoFill />
                    </span>
                    <h4>Live stream</h4>
                </div>
                <div className="image" onClick={() => setShowInputUrl(!showInputUrl)}>
                    <span className="icon">
                        <BsImages />
                    </span>
                    <h4>Images</h4>
                </div>
                <div className="feeling">
                    <span className="icon">
                        <MdSentimentVerySatisfied />
                    </span>
                    <h4>Feeling/Action</h4>
                </div>
            </div>
        </section>
    );
};

export default MessengeSender;

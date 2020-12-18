import React from "react";
import "./Story.scss";
const Story = () => {
    return (
        <section className="stories">
            <div
                className="story"
                style={{
                    backgroundImage: `url(https://images.pexels.com/photos/5716807/pexels-photo-5716807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
                }}
            >
                <img
                    src="https://images.pexels.com/photos/5878830/pexels-photo-5878830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="avatar"
                    className="avatar"
                />
                <h4>John</h4>
            </div>
            <div
                className="story"
                style={{
                    backgroundImage: `url(https://images.pexels.com/photos/5799683/pexels-photo-5799683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
                }}
            >
                <img
                    src="https://images.pexels.com/photos/5878830/pexels-photo-5878830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="avatar"
                    className="avatar"
                />
                <h4>Smith</h4>
            </div>
            <div
                className="story"
                style={{
                    backgroundImage: `url(https://images.pexels.com/photos/5878857/pexels-photo-5878857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
                }}
            >
                <img
                    src="https://images.pexels.com/photos/4118749/pexels-photo-4118749.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="avatar"
                    className="avatar"
                />
                <h4>Anna</h4>
            </div>
            <div
                className="story"
                style={{
                    backgroundImage: `url(https://images.pexels.com/photos/3812861/pexels-photo-3812861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
                }}
            >
                <img
                    src="https://images.pexels.com/photos/4519256/pexels-photo-4519256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="avatar"
                    className="avatar"
                />
                <h4>Peter</h4>
            </div>
        </section>
    );
};

export default Story;

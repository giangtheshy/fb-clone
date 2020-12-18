import React, { useState, useCallback, useEffect } from "react";
import Room from "./Room";
import { MdGroup } from "react-icons/md";
import MiniIcon from "./MinIcon";
import "./Messenger.scss";
import db from "../../firebase";
import { useGlobalContext } from "../../context";
const Rooms = () => {
    const { rooms, collectionRoom } = useGlobalContext();
    const [listRoom, setListRoom] = useState([]);
    const [showMinimize, setShowMinimize] = useState(true);
    const fetchRoomList = useCallback(() => {
        let temp = [];
        if (rooms.length > 0) {
            rooms.forEach((room) => {
                db.collection("rooms")
                    .doc(`${room}`)
                    .onSnapshot((doc) => {
                        temp.push(doc.data());
                    });
            });
        }
        return temp;
    }, [collectionRoom]);
    useEffect(() => {
        setListRoom(fetchRoomList());
        console.log(listRoom);
    }, [fetchRoomList]);
    console.log(listRoom);
    if (listRoom.length === 0) {
        console.log(listRoom);

        return <h1>hello</h1>;
    }
    return (
        <aside className="chat-section">
            <section className="minimize-section">
                {showMinimize && (
                    <div className="icon-container">
                        {listRoom.map((room) => {
                            // if (room.isMinimized === true) {
                            // console.log(room);
                            return <MiniIcon key={room.id} room={room} />;
                            // }
                        })}
                    </div>
                )}
                <button className="icon-group" onClick={() => setShowMinimize(!showMinimize)}>
                    <MdGroup />
                </button>
            </section>
            {listRoom.map((room) => {
                // console.log(room);
                // if (room.isMinimized === false) {
                return <Room key={room.id} room={room} />;
                // }
            })}
        </aside>
    );
};

export default Rooms;

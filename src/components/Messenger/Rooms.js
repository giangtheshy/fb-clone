import React, { useState } from "react";
import Room from "./Room";
import { MdGroup } from "react-icons/md";
import MiniIcon from "./MinIcon";
import "./Messenger.scss";
import { useGlobalContext } from "../../context";
import Loading from "../Loading";
const Rooms = () => {
  const { listRoom } = useGlobalContext();
  const [showMinimize, setShowMinimize] = useState(true);
  if (listRoom.length === 0) {
    return <Loading />;
  }
  return (
    <aside className="chat-section">
      <section className="minimize-section">
        {showMinimize && (
          <div className="icon-container">
            {listRoom.map((room) => {
              return <MiniIcon key={room.id} room={room} />;
            })}
          </div>
        )}
        <button className="icon-group" onClick={() => setShowMinimize(!showMinimize)}>
          <MdGroup />
        </button>
      </section>
      {listRoom.map((room) => {
        return <Room key={room.id} room={room} />;
      })}
    </aside>
  );
};

export default Rooms;

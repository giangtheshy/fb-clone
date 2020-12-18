import React from "react";
import Header from "./components/Header/Header";
import SidebarLeft from "./components/Sidebar/SidebarLeft";
import Story from "./components/Story/Story";
import SidebarRight from "./components/Sidebar/SidebarRight";
import MessengeSender from "./components/MessengeSender/MessengeSender";
import Feed from "./components/Feed/Feed";
import { useGlobalContext } from "./context";
import Login from "./components/Login/Login";
import Rooms from "./components/Messenger/Rooms";
const App = () => {
    const { user } = useGlobalContext();
    return (
        <main>
            {user ? (
                <>
                    <Header />
                    <div className="content-app">
                        <SidebarLeft />
                        <div className="content-center">
                            <Story />
                            <MessengeSender />
                            <Feed />
                        </div>
                        <SidebarRight />
                    </div>
                    <Rooms />
                </>
            ) : (
                <Login />
            )}
        </main>
    );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import SidebarLeft from "./components/Sidebar/SidebarLeft";
import SidebarRight from "./components/Sidebar/SidebarRight";
import { useGlobalContext } from "./context";
import Login from "./components/Login/Login";
import Rooms from "./components/Messenger/Rooms";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Market from "./pages/Market";
import Group from "./pages/Group";
const App = () => {
  const { user } = useGlobalContext();
  return (
    <main>
      <Router>
        {user ? (
          <>
            <Header />

            <Switch>
              <Route path="/" exact>
                <div className="content-app">
                  <SidebarLeft />
                  <div className="content-center">
                    <Home />
                  </div>
                  <SidebarRight />
                </div>
              </Route>
              <Route path="/videos">
                <div className="content-app">
                  <SidebarLeft />
                  <div className="content-center">
                    <Videos />
                  </div>
                  <SidebarRight />
                </div>
              </Route>
              <Route path="/market">
                <div className="content-app  market">
                  <SidebarLeft />
                  <div className="content-center">
                    <Market />
                  </div>
                </div>
              </Route>
              <Route path="/profile/:id">
                <SidebarLeft className={"profile"} />
                <Profile />
              </Route>
              <Route path="/group">
                <Group />
              </Route>
              <Route path="*">
                <Error />
              </Route>
            </Switch>

            <Rooms />
          </>
        ) : (
          <Login />
        )}
      </Router>
    </main>
  );
};

export default App;

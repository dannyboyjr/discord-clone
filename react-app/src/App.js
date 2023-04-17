import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainComponent from "./components/Main Component/main";
import MainDm from "./components/DMs/MainDm";
import SplashPage from "./components/SplashPage";
import AllServers from "./components/AllServers/AllServers";
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="page-layout">
      {/* <Navigation isLoaded={isLoaded} /> */}


      </div>
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SplashPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute>
          <Route path="/chat/reload">
            <Redirect to="/:serverId(\d+)/:channelId(\d+)?"/>
          </Route>
          <Route path="/:serverId(\d+)/:channelId(\d+)?">
              <Navigation isLoaded={isLoaded} />
              <MainComponent />
          </Route>
          <Route path="/@me/:serverId(\d+)?/:channelId(\d+)?">
          <Navigation isLoaded={isLoaded} />
            <MainDm />
          </Route>
          <Route path="/guild-discovery">
            <Navigation isLoaded={isLoaded} />
            <AllServers />
          </Route>

          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;

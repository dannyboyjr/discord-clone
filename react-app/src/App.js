import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainComponent from "./components/Main Component/main";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="page-layout">
      <Navigation isLoaded={isLoaded} />
      <MainComponent />

      </div>
      {isLoaded && (
        <Switch>
          {/* <Route path="/" exact>
            <HOLDERPage />
          </Route> */}
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          {/* <Route path="/:serverId(\d+)/:channelId(\d+)">
            <HOLDERPage />
          </Route> */}
          {/* <Route path="/@me">
            <HOLDERPage />
          </Route> */}

        </Switch>
      )}
    </>
  );
}

export default App;

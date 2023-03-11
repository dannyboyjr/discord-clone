import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainComponent from "./components/Main Component/main";
<<<<<<< HEAD
import MainDm from "./components/DMs/MainDm";
=======
>>>>>>> natalia
import SplashPage from "./components/SplashPage";


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
          <Route path="/:serverId(\d+)/:channelId(\d+)?">
              <MainComponent />
          </Route>
          <Route path="/@me/:serverId(\d+)?/:channelId(\d+)?">
            <MainDm />
          </Route>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;

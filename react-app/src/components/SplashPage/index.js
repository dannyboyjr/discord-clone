import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserServers } from "../../store/servers";
import "./SplashPage.css"
import splashImage from "./discord-background.jpg"




function SplashPage({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);
	const userServers = useSelector(state => state.servers.currentUserServers);
    const serversArr = Object.values(userServers);
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionUser){
                history.push(`/@me`)
        }
    }, [dispatch, history, sessionUser, userServers, serversArr.length])

//check with dm's -- when it's completed

    return (
        <>
            <div className='splash-container'>
                <img className="discord-img" src={splashImage} alt="Splash Image"/>
                <p className='splash-welcome-text'>
                    Welcome to the Home Page of Discord!  You can log in to your account from here or you can join us by signing up for one.
                </p>
                <div  className='splash-container-links'>
                    <NavLink to='/login' className="login-button" activeClassName="active">Log In</NavLink>
                    <NavLink to='/signup' className="signup-button" activeClassName="active">Sign Up</NavLink>
                </div>
            </div>
        </>
    )
}

export default SplashPage

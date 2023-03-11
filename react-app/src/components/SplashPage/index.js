import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserServers } from "../../store/servers";




function SplashPage({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);
	const userServers = useSelector(state => state.servers.currentUserServers);
    const serversArr = Object.values(userServers);
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionUser){
            dispatch(getUserServers()).then((server) =>{
                history.push(`/:${server.id}`)} )
        }
    }, [userServers])



    return (
        <>
            <div className='splash-container'>
                <p>
                    Hey, this is the home page for our discord app.  You can log in to your account from here or you can join us by signing up for one.
                </p>
                <div  className='splash-container-links'>
                    <NavLink to='/login'>Log In</NavLink>
                    <NavLink to='/signup'>Sign Up</NavLink>
                </div>
            </div>
        </>
    )
}

export default SplashPage

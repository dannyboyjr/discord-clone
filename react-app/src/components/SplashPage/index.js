import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// import { getUserServers } from "../../store/servers";
import "./SplashPage.css"
import splashImage from "./discord-background.jpg"
// import GitHubImg from '../../assets/github.png'



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
                <img className="discord-img" src={splashImage} alt="Splash"/>
                <div className='splash-welcome-text'>
                    <h1 className='splash-title'>Galloping Griffs</h1>
                    <h4>Welcome to our app!  You can log in to your account from here. Don't have one? You can register below to sign up!</h4>
                </div>

                <div  className='splash-container-links'>
                    <NavLink to='/login' className="login-button" activeClassName="active">Log In</NavLink>
                    <NavLink to='/signup' className="signup-button" activeClassName="active">Sign Up</NavLink>
                </div>
                <div className='splash-git-container'>
                    <h4 className='splash-git-title'>Check us out!</h4>
                    <div className='splash-git-links'>
                    <a className='splash-git-links-text' href="https://github.com/dannyboyjr">
                        {/* <img src={GitHubImg} alt="Dan Kimball" /> */}
                        <p>Dan Kimball</p>
                     </a>
                    <a className='splash-git-links-text' href="https://github.com/scottkonner">
                        {/* <img src={GitHubImg} alt="Scott Konner" /> */}
                        <p>Scott Konner</p>
                    </a>
                    <a className='splash-git-links-text' href="https://github.com/natie92">
                        {/* <img src={GitHubImg} alt="Natalia Miller" /> */}
                        <p>Natalia Miller</p>
                    </a>
                    </div>
                </div>


                {/* <div>
                    <h4>Contributors</h4>
                    <div>
                        <a href="https://github.com/dannyboyjr">
                        <img src={GitHubImg} alt="Dan imball" />
                        <p>Dan Kimball</p>
                        </a>
                        <a href="https://github.com/scottkonner">
                        <img src={GitHubImg} alt="Scott Konner" />
                        <p>Scott Konner</p>
                        </a>
                        <a href="https://github.com/natie92">
                        <img src={GitHubImg} alt="Natalia Miller" />
                        <p>Natalia Miller</p>
                        </a>
                    </div>
                </div> */}

            </div>
        </>
    )
}

export default SplashPage

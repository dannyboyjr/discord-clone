import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { getAllServers } from '../../store/servers'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChevronDown } from "@fortawesome/free-solid-svg-icons"

function Navigation({ isLoaded }){
	const dispatch = useDispatch()

	const sessionUser = useSelector(state => state.session.user);
	// const servers = useSelector(state => state.servers)
	const [showNotifications, setShowNotifications ] = useState(false)

	useEffect(()=>{
		dispatch(getAllServers())
	},[])

	const handleNotificationClick = () => {
		setShowNotifications(!showNotifications);
	}

	return (
	<>
		<nav className='navbar'>
			<div className='left-nav-bar'>
				<div className='nav-logo'>
					<img src="/discord_logo.svg" alt="Discord Logo"/>
				</div>
			</div>
				<li>
				<NavLink exact to="/">Home</NavLink>
				</li>
				{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
					<h1>HELLO</h1>
				</li>
				)}

		</nav>
	</>
	);
}

export default Navigation;

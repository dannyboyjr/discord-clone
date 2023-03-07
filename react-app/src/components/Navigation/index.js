import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

import
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell, faChevronDown } from "@fortawesome/free-solid-avg-icons"

function Navigation({ isLoaded }){

	const sessionUser = useSelector(state => state.session.user);
	const [showNotifications, setShowNotifications ] = useState(false)

	const [selectedServer, setSelectedServer] = useState(null)
	const [messages, setMessages] = useState([])
	const [channels, setChannels] = useState([])



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
				</li>
				)}

		</nav>
	</>
	);
}

export default Navigation;

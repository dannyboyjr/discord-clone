import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { getServerById, getAllServers, getUserServers, deleteServerById, editServerById } from '../../store/servers'
import { getAllChannelsInServer, getChannelById } from '../../store/channels'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChevronDown } from "@fortawesome/free-solid-svg-icons"

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()

	const sessionUser = useSelector(state => state.session.user);
	const serverGuy = useSelector(state => state.servers.serverById)
	const [showNotifications, setShowNotifications] = useState(false)

	const [name, setName] = useState("");
	const [icon, setIcon] = useState("");
	const [channels, setChannels] = useState([]);


	useEffect(() => {
		dispatch(getAllServers());
		dispatch(getUserServers());
		dispatch(getServerById(8));

	}, [dispatch]);

	useEffect(() => {
		if (serverGuy) {
			setName(serverGuy.name);
			setIcon(serverGuy.icon);
			dispatch(getAllChannelsInServer(serverGuy));
		}
	}, [serverGuy]);

	useEffect(() => {
		dispatch(getChannelById(serverGuy.id, 7));
	  }, [dispatch, serverGuy.id]);
	


	const handleNotificationClick = () => {
		setShowNotifications(!showNotifications);
	}

	//-------------



	const handleSubmit = async (e) => {
		e.preventDefault();

		const editedServer = {
			id: serverGuy.id,
			name,
			icon,
		};

		dispatch(editServerById(editedServer));
	};
	const handleDelete = async (e) => {
		e.preventDefault()
		console.log("did this work?")
		dispatch(deleteServerById(9))


	}
	//--------------------

	return (
		<>
			<nav className='navbar'>
				<div className='left-nav-bar'>
					<div className='nav-logo'>
						<img src="/discord_logo.svg" alt="Discord Logo" />
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

				<form className='create' onSubmit={handleSubmit}>

					<label>Name:</label>
					<input
						type="text"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>

					<label>Icon: </label>
					<input
						type="text"
						onChange={(e) => setIcon(e.target.value)}
						value={icon}
					/>
					<button>edit Server</button>

				</form>
				<button onClick={handleDelete}>Delete server</button>




			</nav>
			<div>
      {channels.map(channel => (
        <div key={channel.id}>{channel.name}</div>
      ))}
    </div>
		</>
	);
}

export default Navigation;

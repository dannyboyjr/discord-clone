import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerCard from './ServerCard';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
//import ProfileButton from "./ProfileButton"
import CreateServerModal from '../CreateServerModal';
import { getUserServers } from "../../store/servers"
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const sessionUser = useSelector(state => state.session.user);
	const userServers = useSelector(state => state.servers.currentUserServers); //double check name of state for server
	
	useEffect(() => {
		dispatch(getUserServers())
	}, [dispatch])

	const serversArr = Object.values(userServers);

	const addServer = () => {
		setShowModal(true);
	}
	const handleClose = () => {
		setShowModal(false);
	  };

	return (
		<>
		<div className='servers-bar'>
			<ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>

			<div className='servers-list'>
				{serversArr.map(server =>
					<ServerCard server={server} />
				)}
			</div>
			<div className='server-card-pic add-server-pic'>
				
				<img onClick={addServer} src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png' />
			</div>
			{showModal && <CreateServerModal onClose={handleClose}/>}
			
		</div>
		</>
	)

}

export default Navigation;

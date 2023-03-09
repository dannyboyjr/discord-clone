import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerCard from './ServerCard';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
//import ProfileButton from "./ProfileButton"
//import CreateServerModal from ""
import { getUserServers } from "../../store/servers"
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const userServers = useSelector(state => state.servers.currentUserServers); //double check name of state for server

	useEffect(() => {
		dispatch(getUserServers())
	}, [dispatch])

	const serversArr = Object.values(userServers);
	console.log(serversArr)

	const addServer = () => {
		console.log("ADD SERVER")
	}

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
			<div className='server-card-pic'>
				{/* <OpenModalButton buttonText="Add Server" modalComponent={<CreateServerModal/>}/> */}
				<img onClick={addServer} src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png' />
			</div>
			
		</div>
		</>
		//remember to import create server modal here
	)

	// dispatch that thunk in a useEffect --- which will have an empty dependency arr that will have it run once.

	// then use useSelector to get all those servers for your navbar. Then map through those servers and feed that information

	// for each server you're going to have a servercard and feed that into as a prop for your server

}

export default Navigation;

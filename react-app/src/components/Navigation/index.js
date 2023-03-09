import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerCard from './ServerCard';
//import ProfileButton from "./ProfileButton"
//import CreateServerModal from ""
import { getUserServers } from "../../store/servers"
import './Navigation.css';

function Navigation(){
	const [isLoaded, setIsLoaded] = useState(false)
	const dispatch = useDispatch()
	const userServers = useSelector(state => state.servers.currentUserServers); //double check name of state for server

	const serversArr = Object.values(userServers);

	useEffect(() => {
		dispatch(getUserServers())
	}, [dispatch])


	return (
		<>
		<div className='servers-list'>
				{serversArr.map(server =>
				<ServerCard server ={server}/>
        		)}
    	</div>
		<div className='add-server-button'>
		{/* <OpenModalButton buttonText="Add Server" modalComponent={<CreateServerModal/>}/> */}
		</div>
		</>
		//remember to import create server modal here
	)
	// dispatch that thunk in a useEffect --- which will have an empty dependency arr that will have it run once.

	// then use useSelector to get all those servers for your navbar. Then map through those servers and feed that information

	// for each server you're going to have a servercard and feed that into as a prop for your server

}

export default Navigation;

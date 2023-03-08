import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerCard from './serverCard';
//import CreateServerModal from ""
//import {} from "../../store/server";
//import { NavLink, useHistory } from 'react-router-dom';

import './Navigation.css';

function Navigation({ server }){
	const [isLoaded, setIsLoaded] = useState(false)
	const dispatch = useDispatch()
	const servers = useSelector(state => state.servers); //double check name of state for server

	const serversArr = Object.values(servers);

	useEffect(() => {
		dispatch("enter thunk here"())
	}, [dispatch])


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
		<div className='server-list'>
				{serversArr.map(server =>
				<ServerCard server ={server}/>
        		)}
    	</div>
		<div className='add-server'>

		</div>
		</>
		//remember to import create server modal here
	)
	// dispatch that thunk in a useEffect --- which will have an empty dependency arr that will have it run once.

	// then use useSelector to get all those servers for your navbar. Then map through those servers and feed that information

	// for each server you're going to have a servercard and feed that into as a prop for your server

}

export default Navigation;



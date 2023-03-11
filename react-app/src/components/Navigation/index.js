import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerCard from './ServerCard';
import { NavLink } from 'react-router-dom'
import CreateServerModal from '../CreateServerModal';
import OpenModalImage from '../OpenModalImage/index'
import { getUserServers } from "../../store/servers"
import './Navigation.css';


function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const userServers = useSelector(state => state.servers.currentUserServers)
	
	
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
			

			{/* DMS */}
			<div className='server-card-pic add-server-pic'>
			<NavLink className='server-card-pic' to={`/@me`}>
				<img src='https://static.thenounproject.com/png/3861763-200.png' />
				</NavLink>
			</div>




			<div className='servers-list'>
				{serversArr.map(server =>
				 <ServerCard key={server.id} server={server} />
					
				)}
			</div>
			<div className='server-card-pic add-server-pic'>
            <OpenModalImage
                buttonText="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png"
                modalComponent={<CreateServerModal />}
                />
        	</div>
			
		</div>
		</>
	)

}

export default Navigation;

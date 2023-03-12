import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerCard from './ServerCard';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
//import ProfileButton from "./ProfileButton"
import CreateServerModal from '../CreateServerModal';
import { getUserServers } from "../../store/servers"
import { getAllChannelsInServer } from '../../store/channels';
import OpenModalImage from '../OpenModalImage';
import DiscoveryLogo from '../../assets/compass.png'
import DiscordLogo from '../../assets/discord.png'
import './Navigation.css';


function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const sessionUser = useSelector(state => state.session.user);
	const servers = useSelector(state => state.servers); //double check name of state for server
	const userServers = servers.currentUserServers
	const location = useLocation()
	const history = useHistory()


	useEffect(() => {
		dispatch(getUserServers())
	}, [dispatch])



	const serversArr = Object.values(userServers);

	const addServer = () => {
		setShowModal(true);
	}

	return (
		<>
		<div className='servers-bar'>


			{/* DMS */}
			<div className='server-card-pic add-server-pic discord-img'>
			<NavLink className='server-card-pic' to={`/@me`}>
				<img src={DiscordLogo} />
				</NavLink>
			</div>


			<div className='servers-list'>
				{serversArr.map(server =>
				 <ServerCard key={server.id} server={server} />

				)}
			</div>
			{/* <div className='server-card-pic add-server-pic'>

				<img onClick={addServer} src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png' />
			</div>
			{showModal && <CreateServerModal onClose={handleClose}/>} */}
			<div className='server-card-pic add-server-pic'>
            <OpenModalImage
                buttonText="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png"
                modalComponent={<CreateServerModal />}
                />
        	</div>
			<div>
			<div className='server-card-pic add-server-pic'>
			<NavLink className='server-card-pic' to={`/guild-discovery`}>
				<img src={DiscoveryLogo} />
				</NavLink>
			</div>
				
			</div>

		</div>
		</>
	)

}

export default Navigation;

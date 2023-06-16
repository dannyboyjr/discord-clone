import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerCard from './ServerCard';
import { NavLink } from 'react-router-dom';
// import ProfileButton from './ProfileButton';
import CreateServerModal from '../CreateServerModal';
import { getUserServers } from "../../store/servers"
// import { getAllChannelsInServer } from '../../store/channels';
import OpenModalImage from '../OpenModalImage';
import DiscoveryLogo from '../../assets/compass.png'
import DiscordLogo from '../../assets/discord.png'
import AddServerImg from '../../assets/addServer.png'
import './Navigation.css';

function Navigation() {
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)
	const servers = useSelector(state => state.servers); //double check name of state for server
	const userServers = servers.currentUserServers

	useEffect(() => {
		dispatch(getUserServers()).then(()=>setIsLoaded(true))
	}, [dispatch])



	const serversArr = Object.values(userServers);


	return (
		<>
		<div className='servers-bar'>


			{/* DMS */}
			<div className='server-card-pic add-server-pic discord-img'>
			<NavLink className='server-card-pic' to={`/@me`}>
				<img src={DiscordLogo} alt='Logo'/>
				</NavLink>
			</div>


			<div className='servers-list'>
				{isLoaded && serversArr.map(server =>
				 <ServerCard key={server.id} server={server} />

				)}
			</div>

			<div className='server-card-pic add-server-pic'>
            <OpenModalImage
                buttonText={AddServerImg}
                modalComponent={<CreateServerModal />}
                />
        	</div>
			<div>
			<div className='server-card-pic add-server-pic'>
			<NavLink className='server-card-pic' to={`/guild-discovery`}>
				<img src={DiscoveryLogo} alt='Logo'/>
				</NavLink>
			</div>

			</div>

		</div>
		</>
	)

}

export default Navigation;

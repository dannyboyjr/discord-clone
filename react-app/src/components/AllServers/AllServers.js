import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllServers } from "../../store/servers"
import AllServerCard from '../AllServerCard/AllServerCard';
import "./AllServers.css"

const AllServers = () => {
    const dispatch = useDispatch()
    const allServersObj = useSelector(state => state.servers);
    const allServers = allServersObj.allServers
    const allServersArr = Object.values(allServers);

    useEffect(() => {
		dispatch(getAllServers())
	}, [dispatch])

    return (
      <div>
        <div className='all-servers-list'>
        <h1>Explore Servers</h1>
        <div className='all-server-card-display'>
				{allServersArr.map(server =>
				 <AllServerCard key={server.id} server={server} />

				)}
        </div>
        </div>
      </div>
    );
  
}

export default AllServers;
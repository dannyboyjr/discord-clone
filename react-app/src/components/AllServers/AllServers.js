import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllServers } from "../../store/servers"
import AllServerCard from '../AllServerCard/AllServerCard';
import "./AllServers.css"

const AllServers = () => {
    const dispatch = useDispatch()
    const allServers = useSelector(state => state.servers.allServers);
    const allServersArr = Object.values(allServers);
    useEffect(() => {
		dispatch(getAllServers())
	}, [dispatch])

    return (
      <div>
        <div className='all-servers-list'>
        <h1>All Servers</h1>
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
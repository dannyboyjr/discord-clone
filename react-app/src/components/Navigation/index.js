import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import


function Navigation({ isLoaded }){
	const [selectedServer, setSelectedServer] = useState(null)

	function handleServerClick(server) {
    setSelectedServer(server);
	}

	return (
	<>
		<nav className='navbar'>
		    <div className="nav">
				<ul>
					<li onClick={() => handleServerClick('server1')}>Server 1</li>
        			<li onClick={() => handleServerClick('server2')}>Server 2</li>
        			<li onClick={() => handleServerClick('server3')}>Server 3</li>
      			</ul>
      			{selectedServer && (
        			<>
          				<LiveMessages server={selectedServer} />
						//need to import from LiveMessages Component
          				<Channels server={selectedServer} />
						//need to import from Channels Component
       				</>
      			)}
    		</div>
		</nav>
	</>
	);
}

export default Navigation;

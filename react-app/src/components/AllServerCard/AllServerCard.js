import './AllServerCard.css'
import { joinServerById, leaveServerById } from "../../store/servers"
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';


const AllServerCard = ({ server }) => {
    const history = useHistory();
    const dispatch = useDispatch();  
    const userServers = useSelector(state => state.servers.currentUserServers)
    const sessionUser = useSelector(state => state.session.user);
    const userServersArr = Object.values(userServers)

    const iconUrl = server.icon ? server.icon : 'https://www.online-tech-tips.com/wp-content/uploads/2021/04/1-Discord-Stream-No-Sound-Featured.png';

    const handleImgError = (e) => {
      e.target.src = 'https://www.online-tech-tips.com/wp-content/uploads/2021/04/1-Discord-Stream-No-Sound-Featured.png';
  }
    //check to see if user is already in server && doesn't own server. (option to leave server)
    
    // check to see if user is owner (option)
      const verify = userServersArr.find(item => {
        return item.id == server.id
      })
      

    const handleJoin = (e) => {
        if (server.id){
        e.preventDefault();
        dispatch(joinServerById(server.id)).then(()=> history.push('/@me'))
        
        }
    }
    const handLeave = (e) => {
        if (server.id){
        e.preventDefault();
        dispatch(leaveServerById(server.id)).then(()=> history.push('/@me'))
        
        }
    }


    return (

            <div className="all-server-card-container">
                <img className="all-server-card-img-container" 
                  src={iconUrl}
                  onError={handleImgError}
                  alt={server.name}
                />
                <h3 className="all-server-card-name"> {server.name}</h3>
                {verify && <button onClick={handLeave} className="join-server-button">leave Server</button>}
                {!verify && <button onClick={handleJoin} className="join-server-button">Join Server</button>}
                {/* {owner && <button onClick={handleJoin} className="join-server-button">Delete Server</button>} */}
            </div>
    )
}

export default AllServerCard
import './AllServerCard.css'
import { joinServerById } from "../../store/servers"
import { useHistory } from 'react-router-dom';
import {useDispatch } from 'react-redux';

const AllServerCard = ({ server }) => {
    const history = useHistory();
    const dispatch = useDispatch();    
    const iconUrl = server.icon ? server.icon : 'https://www.online-tech-tips.com/wp-content/uploads/2021/04/1-Discord-Stream-No-Sound-Featured.png';
    

    const handleSubmit = (e) => {
        if (server.id){
        e.preventDefault();
        dispatch(joinServerById(server.id)).then(()=> history.push('/@me'))
        
        }
    }
    return (

            <div className="all-server-card-container">
                <img className="all-server-card-img-container" src={iconUrl} />
                <h3 className="all-server-card-name"> {server.name}</h3>
                <button onClick={handleSubmit} className="join-server-button">Join Server</button>
            </div>
    )
}

export default AllServerCard
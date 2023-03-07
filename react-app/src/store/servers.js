const LOAD_SERVERS = "servers/loadServers";
// const CREATE_SERVERS = "servers/createServers";
// const DELETE_SERVERS = "servers/deleteServers";


const loadServers = (servers) => ({ //all spots
	type: LOAD_SERVERS,
	servers
})

export const getAllServers = () => async (dispatch) => {
	const response = await fetch("/api/servers/");
	if (response.ok) {
		const data = await response.json();
		// if (data.errors) {
		// 	return;
		// }

		dispatch(loadServers(data.servers));
	}
};


const initialState = {};
const serversReducer = (state = initialState, action) => {
let newState;
switch (action.type) {
    case LOAD_SERVERS:
        newState = {...state}
        console.log("CONSOLELOG:   ", action.servers)
        action.servers.forEach(server =>{
        newState[server.id] = server
    });
    return newState;
    default:
    return state;
    }
}

export default serversReducer;
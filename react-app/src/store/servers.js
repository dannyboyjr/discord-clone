const LOAD_SERVERS = "servers/loadServers";
const LOAD_USER_SERVERS = 'servers/userServers';
const LOAD_SERVER_BY_ID = 'servers/loadServerById';
const CREATE_SERVER = "servers/createServer";
const EDIT_SERVER = 'servers/editServer';
const DELETE_SERVERS = "servers/deleteServers";
const JOIN_SERVER = "servers/joinServer";
const LEAVE_SERVER = "servers/leaveServers";
const RESET_SERVER = "servers/resetServers";


const loadServers = (servers) => ({
    type: LOAD_SERVERS,
    servers
});

const loadUserServers = (servers) => ({
    type: LOAD_USER_SERVERS,
    servers
});

const loadServerById = (server) => ({
    type: LOAD_SERVER_BY_ID,
    server
});

const createServer = (server) => ({
    type: CREATE_SERVER,
    server
});

const editServer = (server) => ({
    type: EDIT_SERVER,
    server
});

const deleteServer = (server) => ({
    type: DELETE_SERVERS,
    server
});

const joinServer = (server) => ({
    type: JOIN_SERVER,
    server
});
const leaveServer = (server) => ({
    type: LEAVE_SERVER,
    server
});

export const resetServer = () => ({
    type: RESET_SERVER
})

export const getAllServers = () => async (dispatch) => {
    const response = await fetch("/api/servers/");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadServers(data.servers));
    }
};

export const getUserServers = () => async (dispatch) => {
    const response = await fetch("/api/servers/current");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserServers(data));
        return data[0]
    }
};

export const getServerById = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadServerById(data));
    }
};


export const createAServer = (server) => async (dispatch) => {
    const response = await fetch("/api/servers/", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(server)
    });
    if (response.ok) {
        const server = await response.json();
        return dispatch(createServer(server))
    }
    return response
};

export const editServerById = (serverId, payload) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const server = await response.json();
        dispatch(editServer(server))
        return
    }
    return response
};

export const deleteServerById = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteServer(id))
    }
};


export const joinServerById = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/join`, {
        method: "POST",
    });
    if (response.ok) {
        const server = await response.json();
        dispatch(joinServer(server))
        return
    }
    return response
};

export const leaveServerById = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}/leave`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(leaveServer(id))
    }
};



const initialState = {
    allServers: {},
    serverById: {},
    currentUserServers: {}

};
const serversReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case LOAD_SERVERS:

            newState = { ...state }
            action.servers.forEach(server => {
                newState.allServers[server.id] = server
            });
            return newState

        case LOAD_USER_SERVERS:

            newState = { ...state }
            action.servers.forEach(server => {
                newState.currentUserServers[server.id] = server
            });
            return newState

        case LOAD_SERVER_BY_ID:
            newState = { ...state }
            newState.serverById = action.server
            return newState;

        case CREATE_SERVER:
            newState = { ...state }
            newState.allServers[action.server.id] = action.server
            newState.currentUserServers[action.server.id] = action.server
            return newState;

        case EDIT_SERVER:
            newState = { ...state };
            newState.allServers[action.server.id] = action.server;
            newState.currentUserServers[action.server.id] = action.server;
            newState.serverById = action.server;
            return newState;

        case DELETE_SERVERS:
            newState = { ...state }
            delete newState.allServers[action.server]
            delete newState.currentUserServers[action.server]
            return newState
        case JOIN_SERVER:
            newState = { ...state };
            newState.currentUserServers[action.server.id] = action.server;
            newState.serverById = action.server;
            return newState;
        case LEAVE_SERVER:
            newState = { ...state }
            delete newState.currentUserServers[action.server]
            return newState

        case RESET_SERVER:
            newState = { ...state }
            newState.allServers = {}
            newState.serverById = {}
            newState.currentUserServers = {}
            return newState

        default:
            return state;
    }
}

export default serversReducer;

const CREATE_PRIVATE_SERVER = "dms/createPrivateServer";
const LOAD_PRIVATE_CHANNELS = "dms/loadPrivateChannels";
const LOAD_PRIVATE_MESSAGES = 'dms/loadPrivateMessages'
const CREATE_PRIVATE_MESSAGE = 'dms/createPrivateMessages'



const loadPrivateChannelsOfUser = (channels) => ({
    type: LOAD_PRIVATE_CHANNELS,
    channels
});

const loadDMMessages = (messages) => ({
    type: LOAD_PRIVATE_MESSAGES,
    messages
});

const createPrivateServer = (server) => ({
    type: CREATE_PRIVATE_SERVER,
    server
})

const createPrivateMessage = (message) => ({
    type: CREATE_PRIVATE_MESSAGE,
    message
})



export const getAllPrivateChannelsOfUser = () => async (dispatch) => {
    const response = await fetch('/api/servers/dms');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadPrivateChannelsOfUser(data));
    }
};

export const getAllDMMessagesInChannel = (serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/@me/${serverId}/${channelId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadDMMessages(data.Messages));
    }
};

export const createDirectMessage = (serverId, channelId, message) => async (dispatch) => {
    const response = await fetch(`/api/@me/${serverId}/${channelId}`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(message),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createPrivateMessage(data));
    }
};

//still need to add create private message
export const createDMServer = (username, server) => async (dispatch) => {
    const response = await fetch(`/api/servers/dm/${username}`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(server)
    });
    if (response.ok) {
        const server = await response.json();
        return dispatch(createPrivateServer(server))
    }
    else(
        console.log('Cannot find user!')
    )
    return response
};




const initialState = {};

const dmReducer = (state = initialState, action) => {
let newState = { ...state };
  switch (action.type) {

    case LOAD_PRIVATE_CHANNELS:
        action.channels.forEach((channel) => {
            newState[channel.id] = channel;
        });
        return newState

    case LOAD_PRIVATE_MESSAGES:
        action.messages.forEach(message => {
            if(!newState[message.channel_id]){
                newState[message.channel_id] = {}

            }
            if(!newState[message.channel_id].messages){
                newState[message.channel_id].messages = {}
            }
            newState[message.channel_id].messages[message.id] = message;
            });
        return newState;

    case CREATE_PRIVATE_SERVER:
        newState = { ...state }
        newState[action.server.id] = action.server
        return newState;

    case CREATE_PRIVATE_MESSAGE:
        const { message } = action;
        const channelId = message.channel_id;
        return {
            ...state,[channelId]: {
                ...state[channelId],
                messages: {
                    ...state[channelId].messages,
                    [message.id]: message,
                },
            },
        };


    default:
        return state;
    }
  };

  export default dmReducer;

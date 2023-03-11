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



export const getAllPrivateChannelsOfUser = () => async (dispatch) => {
    const response = await fetch('api/servers/dms');
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
            if(!newState[message.channel_id].messages){
                newState[message.channel_id].messages = {}
            }
            newState[message.channel_id].messages[message.id] = message;
            });
        return newState;

    default:
        return state;
    }
  };
  
  export default dmReducer;
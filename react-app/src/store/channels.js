const LOAD_CHANNELS = "channels/loadChannels";
const LOAD_CHANNEL_BY_ID = "channels/loadChannelById";
const CREATE_CHANNEL = "channels/createChannel";
const EDIT_CHANNEL = "channels/editChannel";
const DELETE_CHANNEL = "channels/deleteChannel";
// const LOAD_MESSAGES = "channels/loadMessages";
// const CREATE_MESSAGE = "channels/createMessage";

const loadChannels = (channels) => ({
    type: LOAD_CHANNELS,
    channels
});

const loadChannelById = (channel) => ({
    type: LOAD_CHANNEL_BY_ID,
    channel
});

const createChannel = (channel) => ({
    type: CREATE_CHANNEL,
    channel
});

const editChannel = (channel) => ({
    type: EDIT_CHANNEL,
    channel
});

const deleteChannel = (channelId) => ({
    type: DELETE_CHANNEL,
    channelId
});

// const loadMessages = (messages) => ({
//     type: LOAD_MESSAGES,
//     messages
// });

// const createMessage = (message) => ({
//     type: CREATE_MESSAGE,
//     message
// });


export const getAllChannelsInServer = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}/channels`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadChannels(data.channels));
    }
};

export const getChannelById = (serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels/${channelId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadChannelById(data));
    }
};

export const createChannelInServer = (serverId, channel) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(channel),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createChannel(data));
    }
};

export const editChannelById = (serverId, channelId, channel) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels/${channelId}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(channel),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editChannel(data));
    }
};

export const deleteChannelById = (serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels/${channelId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteChannel(channelId));
    }
};


// export const getAllMessagesInChannel = (serverId, channelId) => async (dispatch) => {
//     const response = await fetch(`/api/servers/${serverId}/channels/${channelId}/messages`);
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(loadMessages(data.Messages));
//     }
// };

// export const createMessageInChannel = (serverId, channelId, message) => async (dispatch) => {
//     const response = await fetch(`/api/servers/${serverId}/channels/${channelId}/messages`, {
//         headers: { "Content-Type": "application/json" },
//         method: "POST",
//         body: JSON.stringify(message),
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(createMessage(data));
//     }
// };



const initialState = {

};

const channelsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_CHANNELS:
            newState= {}
            action.channels.forEach((channel) => {
                newState[channel.id] = channel;
            });
            return newState;

        case LOAD_CHANNEL_BY_ID:
            newState[action.channel.id] = action.channel;
            return newState;

        case CREATE_CHANNEL:
            newState[action.channel.id] = action.channel;
            return newState;

        case EDIT_CHANNEL:
            newState[action.channel.id] = action.channel;
            return newState;

        case DELETE_CHANNEL:
            delete newState[action.channelId];
            return newState;

        // case LOAD_MESSAGES:
        //     action.messages.forEach(message => {
        //         if(!newState[message.channel_id].messages){
        //             newState[message.channel_id].messages = {}
        //         }
        //         newState[message.channel_id].messages[message.id] = message;
        //     });
        //     console.log(newState)
        //     return newState;

        //     case CREATE_MESSAGE:
        //         const { message } = action;
        //         const channelId = message.channel_id;
        //         return {
        //             ...state,[channelId]: {
        //                 ...state[channelId],
        //                 messages: {
        //                     ...state[channelId].messages,
        //                     [message.id]: message,
        //                 },
        //             },
        //         };

        default:
            return state;
    }
};

export default channelsReducer;

const LOAD_CHANNELS = "channels/loadChannels";
const LOAD_CHANNEL_BY_ID = "channels/loadChannelById";
const CREATE_CHANNEL = "channels/createChannel";
const EDIT_CHANNEL = "channels/editChannel";
const DELETE_CHANNEL = "channels/deleteChannel";


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

export const getAllChannelsInServer = (server) => async (dispatch) => {
    const response = await fetch(`/api/servers/${server.id}/channels`);
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
    const response = await fetch(`/api/${serverId}/channels`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(channel),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createChannel(data));
    }
};

export const editChannelById = (serverId, channel) => async (dispatch) => {
    const response = await fetch(`/api/${serverId}/channels/${channel.id}`, {
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
    const response = await fetch(`/api/${serverId}/channels/${channelId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteChannel(channelId));
    }
};

const initialState = {
    allChannels: {},
    channelById: {},
};

const channelsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_CHANNELS:
            newState = { ...state };
            action.channels.forEach((channel) => {
                newState.allChannels[channel.id] = channel;
            });
            return newState;

        case LOAD_CHANNEL_BY_ID:
            newState = { ...state };
            newState.channelById = action.channel;
            return newState;

        case CREATE_CHANNEL:
            newState = { ...state };
            newState.allChannels[action.channel.id] = action.channel;
            return newState;

        case EDIT_CHANNEL:
            newState = { ...state };
            newState.allChannels[action.channel.id] = action.channel;
            return newState;

        case DELETE_CHANNEL:
            newState = { ...state };
            delete newState.allChannels[action.channelId];
            return newState;

        default:
            return state;
    }
};

export default channelsReducer;
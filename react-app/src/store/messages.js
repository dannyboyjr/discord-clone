const LOAD_MESSAGES = "messages/loadMessages";
const CREATE_MESSAGE = "messages/createMessage";

const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
});

export const createMessage = (message) => ({
    type: CREATE_MESSAGE,
    message
});


export const getAllMessagesInChannel = (serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels/${channelId}/messages`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadMessages(data.Messages));
    }
};

export const createMessageInChannel = (serverId, channelId, message) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels/${channelId}/messages`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(message),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createMessage(data));
        return data;
    }

};


const initialState = {

};

const messagesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {

            // action.messages.forEach(message => {
            //     if(!newState[message.channel_id]){
            //         newState[message.channel_id] = {}
            //     }
            //     newState[message.channel_id]= message;
            // });
            // console.log(newState)
            // return newState;

        case LOAD_MESSAGES:
            newState={}
            action.messages.forEach((message) => {
                newState[message.id] = message;
            });
            return newState;

        // case CREATE_MESSAGE:
        //     const { message } = action;
        //     const channelId = message.channel_id;
        //     return {
        //         ...state,[channelId]: {
        //             ...state[channelId],
        //             messages: {
        //                 ...state[channelId].messages,
        //                 [message.id]: message,
        //             },
        //         },
        //     };

        case CREATE_MESSAGE:
            newState[action.message.id] = action.message;
            return newState;

        default:
            return state;
    }
};

export default messagesReducer;

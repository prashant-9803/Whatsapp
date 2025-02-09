import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    socket: null,
    demo: false,
    messageSearch: false,
    userContacts : [],
    onlineUsers: [],
}

const messageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
        setDemo: (state, action) => {
            state.demo = action.payload
        },
        setMessageSearch: (state, action) => {
            state.messageSearch = !state.messageSearch
        },
        setUserContacts: (state, action) => {
            state.userContacts = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
    }
})

export const { setMessages, setSocket, addMessage, setDemo, setMessageSearch, setUserContacts, setOnlineUsers } = messageSlice.actions
export default messageSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    socket: null,
    demo: false,
    messageSearch: false
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
        }
    }
})

export const { setMessages, setSocket, addMessage, setDemo, setMessageSearch } = messageSlice.actions
export default messageSlice.reducer
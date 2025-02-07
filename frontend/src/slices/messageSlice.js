import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    socket: null,
    demo: false
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
        }
    }
})

export const { setMessages, setSocket, addMessage, setDemo } = messageSlice.actions
export default messageSlice.reducer
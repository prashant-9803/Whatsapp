import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    socket: null,
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
            state.messages.push(action.payload);
        },
    }
})

export const { setMessages, setSocket, addMessage } = messageSlice.actions
export default messageSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contactsPage: false,
    currentChatUser: undefined
}

const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        setContactsPage: (state, action) => {
            state.contactsPage = action.payload
        },
        setCurrentChatUser: (state, action) => {
            state.currentChatUser = action.payload
        },
    },
})

export const { setContactsPage, setCurrentChatUser } = uiSlice.actions;
export default uiSlice.reducer 
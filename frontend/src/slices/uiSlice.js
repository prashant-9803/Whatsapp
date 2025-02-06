import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contactsPage: false
}

const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        setContactsPage: (state, action) => {
            state.contactsPage = action.payload
        },
    },
})

export const { setContactsPage } = uiSlice.actions;
export default uiSlice.reducer 
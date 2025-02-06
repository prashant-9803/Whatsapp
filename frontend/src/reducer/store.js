import {combineReducers} from 'redux'
import authReducer from '../slices/authSlice'
import uiReducer from "../slices/uiSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

export default rootReducer
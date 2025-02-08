export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

//pre address
const AUTH_ROUTES = `${SERVER_URL}/api/auth`;
const MESSAGE_ROUTES = `${SERVER_URL}/api/messages`;

//api endpoints for auth
export const CHECK_USER_ROUTE = `${AUTH_ROUTES}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTES}/onboard-user`;
export const GET_ALL_CONTACTS_ROUTE = `${AUTH_ROUTES}/get-contacts`;

//api endpoints for messages
export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTES}/add-message`;
export const GET_MESSAGES_ROUTE = `${MESSAGE_ROUTES}/get-messages`;
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGE_ROUTES}/add-image-message`;
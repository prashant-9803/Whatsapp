const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTES = `${SERVER_URL}/api/auth`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTES}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTES}/onboard-user`;
export const GET_ALL_CONTACTS_ROUTE = `${AUTH_ROUTES}/get-contacts`;
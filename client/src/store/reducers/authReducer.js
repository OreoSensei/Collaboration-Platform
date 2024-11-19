import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    AUTH_ERROR,
    USER_LOADED,
    GET_USER_PROFILE,
    UPDATE_USER_PROFILE,
    PROFILE_ERROR,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),  //retrieve token from local storage if available
    isAuthenticated: null,                 //Boolean indicating if user is authenticated.
    loading: true,                         //Boolean indicating if authentication process is ongoing
    user: null,                            //Object to store user information
    error: null,                           //To store any error messages.
};

//Reducer function
export default function authReducer(state = initialState, action) {
    // Destructure type and payload from the action
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            //on successful registration or login
            // localStorage.setItem('token', payload.token); //Store token in localStorage
            return {
                ...state,                 // Keep existing state
                ...payload,               // Add payload data to state (e.g., token, user info)
                isAuthenticated: true,    // Set authenticated to true
                loading: false,           // Set loading to false
                error: null,              // Clear any previous errors
            };
        case USER_LOADED:
            // When user data is loaded (after verifying token)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,            // Set user data
            };
        
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            // on failure or logout
            // localStorage.removeItem('token'); //Remove token from localStorage
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: payload,           // Setting the error message from payload
            };
        case GET_USER_PROFILE:
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                user: payload,
                loading: false,
                error: null,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            //Return current state if action type is not matched
            return state;
    }
}
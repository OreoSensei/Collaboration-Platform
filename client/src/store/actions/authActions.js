import api from '../../utils/api';
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
} from './types';

//Load User
export const loadUser = () => async dispatch => {
    try {
        const res = await api.get('/auth/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data,      //contains user data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response ? err.response.data : { msg: err.message },     //contains error message
        });
    }
};

//Register User
export const register = ({username, email, password}) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    // const body = JSON.stringify({ username, email, password });
    //The above step is no longer needed after creating an axios instance as axios instance handles headers

    try {
        const res = await api.post('/auth/register', { username, email, password });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,          //COntains token and user data
        });

        // Store token in localStorage
        localStorage.setItem('token', res.data.token);

        // After registration, load the user
        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response ? err.response.data : { msg: err.message },   //Contains error message
        });
    }
};


//Login User
export const login = ({email, password}) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    // const body = JSON.stringify({ email, password });
    //The above snippet is no longer needed for same reasons as above.
    

    try {
        const res = await api.post('/auth/login', { email, password });
        console.log(res);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,          //contains token and user data
        });

        //Store token in local storage
        localStorage.setItem('token', res.data.token);

        //After login, load the user
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response ? err.response.data : { msg: err.message },         //COntains error message
        });
    }
};

//Logout User
export const logout = () => dispatch =>{
    // Remove token from localStorage
    localStorage.removeItem('token');

    dispatch({ type: LOGOUT});
};

// Get User Profile
export const getUserProfile = () => async (dispatch) => {
    try {
        const res = await api.get('/users/profile');
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data, //Contains user profile data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response ? err.response.data : { msg: err.message },
        });
    }
};

//Update User Profile
export const updateUserProfile = (formData) => async (dispatch) => {
    try {
        const res = await api.put('/users/profile', formData);
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data,  //Contains updated user data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response ? err.response.data : { msg: err.message },
        });
    }
};
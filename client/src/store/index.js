import {configureStore} from '@reduxjs/toolkit';
// import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer.js';
import documentReducer from './reducers/documentReducer.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        documents: documentReducer,
    },
});

export default store;
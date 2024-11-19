import axios from "axios";
import {
    GET_DOCUMENTS,
    GET_DOCUMENT,
    CREATE_DOCUMENT,
    UPDATE_DOCUMENT,
    DELETE_DOCUMENT,
    DOCUMENT_ERROR,
} from './types';

//Get all documents
export const getDocuments = () => async dispatch => {
    try {
        const res = await axios.get('/api/documents');
        dispatch({
            type: GET_DOCUMENTS,
            payload: res.data,          //Array of Documents
        });
    } catch (err) {
        dispatch({
            type: DOCUMENT_ERROR,
            payload: err.response.data,
        });
    }
};

//Get a single document by id
export const getDocument = id => async dispatch => {
    try {
        const res = await axios.get(`/api/documents/${id}`);
        dispatch({
            type: GET_DOCUMENT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: DOCUMENT_ERROR,
            payload: err.response.data,
        });
    }
};

//Create a new docment
export const createDocument = title => async dispatch => {
    try {
        const res = await axios.post('/api/documents', {title});
        dispatch({
            type: CREATE_DOCUMENT,
            payload: res.data           //Newly created document
        });
    } catch (err) {
        dispatch({
            type: DOCUMENT_ERROR,
            payload: err.response.data,
        });
    }
};

//Update a document

export const updateDocument = (id, content) => async dispatch => {
    try {
        const res = await axios.put(`/api/documents/${id}`, {content});
        dispatch({
            type: UPDATE_DOCUMENT,
            payload: res.data           //Updated document
        });
    } catch (err) {
        dispatch({
            type: DOCUMENT_ERROR,
            payload: err.response.data,
        });
    }
};

//Deleting a document

export const deleteDocument = id => async dispatch => {
    try {
        await axios.delete(`/api/documents/${id}`);
        dispatch({
            type: DELETE_DOCUMENT,
            payload: id,            //ID of the deleted document
        });
    } catch (err) {
        dispatch({
            type: DOCUMENT_ERROR,
            payload: err.response.data,
        });
    }
};
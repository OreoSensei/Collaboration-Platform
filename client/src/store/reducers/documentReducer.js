import {
    GET_DOCUMENTS,
    GET_DOCUMENT,
    CREATE_DOCUMENT,
    UPDATE_DOCUMENT,
    DELETE_DOCUMENT,
    DOCUMENT_ERROR,
} from '../actions/types';

//Initial state for the document reducer
const initialState = {
    documents: [],                        //List of documents
    document: null,                       //Single document object
    loading: null,                        //Indicates if document-related processes are ongoing
    error: null,                          //To store any error messages
};

//Reducer function
export default function documentReducer(state = initialState, action) {
    // destructuring type and payload from the action
    const {type, payload} = action;

    switch(type) {
        case GET_DOCUMENTS:
            //When documents are fetched successfully
            return {
                ...state,
                documents: payload,       //Set the list of documents
                loading: false,
                error: null,
            };
        
        case GET_DOCUMENT:
        case CREATE_DOCUMENT:
        case UPDATE_DOCUMENT:
            //When a single document is fetched, created or updated
            return {
                ...state,
                document: payload,       //Setting the current document
                laoding: false,
                error: null,
            };
        
        case DELETE_DOCUMENT:
            //When deleting a document
            return {
                ...state,
                documents: state.documents.filter(doc => doc.id !== payload),       //Removing the deleted document
                loading: false,
                error: null,
            };
        
        case DOCUMENT_ERROR:
            //When there's an error with document actions
            return {
                ...state,
                error: payload,      //Set the error message
                loading: false,
            };
        
        default:
            //Returning current state if action type is not matched
            return state;
    }
}
import * as actionTypes from '../actionTypes';
import {
    postList,
    getListDetails,
    deleteUserList,
    postListMovie,
    postRemoveListMovie,
    postClearList
} from '../Api';
import { getSessionType, getUserSessionId } from '../reducers/sessionReducer';

const fetchListRequest = (id) => ({
    type: actionTypes.FETCH_LIST_REQUEST,
    payload: {
        id
    }
});

const fetchListSuccess = (data) => ({
    type: actionTypes.FETCH_LIST_SUCCESS,
    payload: {
        data
    }
});

const fetchListFailed = (error) => ({
    type: actionTypes.FETCH_LIST_FAILED,
    payload: {
        error
    }
});

export const fetchList = (listId) => async (dispatch) => {
    dispatch(fetchListRequest(listId));
    try {
        const response = await getListDetails(listId);
        dispatch(fetchListSuccess(response.data));
    } catch (error) {
        dispatch(fetchListFailed(error));
    }
}

const createListRequest = () => ({
    type: actionTypes.CREATE_LIST_REQUEST
});

const createListSuccess = (id) => ({
    type: actionTypes.CREATE_LIST_SUCCESS,
    payload: {
        id
    }
});

const createListFailed = (error) => ({
    type: actionTypes.CREATE_LIST_FAILED,
    payload: {
        error
    }
});

export const createList = (listName, listDescription, listLanguage) => async (dispatch, getState) => {
    const state = getState();
    const userSessionId = getUserSessionId(state);
    dispatch(createListRequest());
    try {
        const response = await postList(userSessionId, listName, listDescription, listLanguage);
        dispatch(createListSuccess(response.id));
        // The response from this request has only given back the id of the new list, not the list
        // itself, so it won't make it into the store and hence won't appear in the UI. Either I 
        // need to dispatch the fetchList thunk, and the user reducer needs to listen for the response
        // from that and manually add the list into the user slice of state... or I need to make it so
        // that CREATE_LIST_SUCCESS invalidates the users cache and then we dispatch the fetchFullProfile
        // thunk (which needs to be imported from ./userActions). With this approach the FETCH_LIST_SUCCESS
        // action no longer needs to worry about the user slice of state, only the list slice of state
        // (which is still to be added).
    } catch (error) {
        dispatch(createListFailed(error));
    }
}

const deleteListRequest = () => ({
    type: actionTypes.DELETE_LIST_REQUEST
});

const deleteListSuccess = () => ({
    type: actionTypes.DELETE_LIST_SUCCESS
});

const deleteListFailed = (error) => ({
    type: actionTypes.DELETE_LIST_FAILED,
    payload: {
        error
    }
});

export const deleteList = (listId) => async (dispatch, getState) => {
    const state = getState();
    const userSessionId = getUserSessionId(state);
    dispatch(deleteListRequest());
    try {
        // Note, currently this is resulting in a 500 error from the TMdb API, even when I 
        // attempted from the sandbox in their API docs. Despite this, it is still actually
        // deleting the list as requested, so is most likely a temporary error on their end. 
        const response = await deleteUserList(listId, userSessionId);
        dispatch(deleteListSuccess());
    } catch (error) {
        dispatch(deleteListFailed(error))
    }
}

const addMovieToListRequest = () => ({
    type: actionTypes.ADD_MOVIE_TO_LIST_REQUEST
});

const addMovieToListSuccess = () => ({
    type: actionTypes.ADD_MOVIE_TO_LIST_SUCCESS
});

const addMovieToListFailed = (error) => ({
    type: actionTypes.ADD_MOVIE_TO_LIST_FAILED,
    payload: {
        error
    }
});

export const addMovieToList = (listId, movieId) => async (dispatch, getState) => {
    const state = getState();
    const userSessionId = getUserSessionId(state);
    dispatch(addMovieToListRequest());
    try {
        const response = await postListMovie(listId, movieId, userSessionId);
        dispatch(addMovieToListSuccess());
    } catch (error) {
        dispatch(addMovieToListFailed(error));
    }
}

const removeMovieFromListRequest = () => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_REQUEST
});

const removeMovieFromListSuccess = (movieId, listId) => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_SUCCESS,
    payload: {
        movieId,
        listId
    }
});

const removeMovieFromListFailed = (error) => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_FAILED,
    payload: {
        error
    }
});

export const removeMovieFromList = (listId, movieId) => async (dispatch, getState) => {
    const state = getState();
    const userSessionId = getUserSessionId(state);
    dispatch(removeMovieFromListRequest());
    try {
        const response = await postRemoveListMovie(listId, movieId, userSessionId);
        // Since this thunk can be dispatch from the individual list view, the _SUCCESS
        // action needs to update the list slice of state by removing the movie
        dispatch(removeMovieFromListSuccess(movieId, listId));
    } catch (error) {
        dispatch(removeMovieFromListFailed(error));
    }
};

const clearListRequest = () => ({
    type: actionTypes.CLEAR_LIST_REQUEST
});

const clearListSuccess = (id) => ({
    type: actionTypes.CLEAR_LIST_SUCCESS,
    payload: {
        id
    }
});

const clearListFailed = (error) => ({
    type: actionTypes.CLEAR_LIST_FAILED
});

export const clearList = (listId) => async (dispatch, getState) => {
    const state = getState();
    const userSessionId = getUserSessionId(state);
    dispatch(clearListRequest());
    try {
        const response = await postClearList(listId, userSessionId);
        dispatch(clearListSuccess(listId));
    } catch (error) {
        dispatch(clearListFailed(error));
    }
}
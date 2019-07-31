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
        const response = await deleteUserList(listId, userSessionId);
        // You can delete a list both from the main lists view (where you view all of your lists) and from
        // the individual list view. To handle deletion from the main lists view, I can just have
        // DELETE_LIST_SUCCESS invalidate the user cache, and then refetch. 
        //
        // In order to deal with deletion from the individual list view there are a couple of approaches
        // I could choose. For the first approach since I'm already going to have DELETE_LIST_SUCCESS 
        // invalidate the user cache, I can just await this thunk in the component that calls it, and 
        // after completion I can redirect to the users main lists route. NOTE, I cannot do that inside
        // this thunk, because there are other contexts (such as within the main lists view) where I want
        // to dispatch this thunk but without redirecting.
        //
        // The other approach if I don't redirect, is to stay on the same route but have the route update to
        // render a message saying that this list was succesfully deleted. This will require some state for
        // that component - isDeleted for example. This approach actually makes it easier to delete the list
        // slice of state - I can just delete it and then update the isDeleted state to show the message. Note,
        // if I delete the list from the store first and then update state to show the delete message, there will
        // be a split second where it's expecting the data to be in the store but it isn't there anymore. This
        // should be imperceptible to the user, but can still cause the app to crash so I need to handle this. I
        // could update isDeleted state first and then dispatch a separate action to delete. Or I could just add
        // some rendering logic that if nothing is in the store it will render null. It should be imperctibly 
        // fast anyway.
        //
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
    const userSessionId = getUserSessionId();
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
        // Since this thunk can be dispatched from the individual list view, the _SUCCESS
        // action needs to update the list slice of state by removing all movies/entities from 
        // the list. 
        dispatch(clearListSuccess(listId));
    } catch (error) {
        dispatch(clearListFailed(error));
    }
}
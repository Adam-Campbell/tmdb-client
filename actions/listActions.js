import * as actionTypes from '../actionTypes';
import { getSessionType } from '../reducers/sessionReducer';
import axios from 'axios';
import { fetchFullProfile } from './userActions';
import { a } from '../axiosClient';

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
        const response = await a.get(`api/list/${listId}`);
        dispatch(fetchListSuccess(response.data));
    } catch (error) {
        dispatch(fetchListFailed(error));
        throw new Error(error.response.status);
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
    dispatch(createListRequest());
    try {
        const response = await a.request('api/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                name: listName,
                description: listDescription
            }
        });
        dispatch(createListSuccess(response.data.list_id));
        await dispatch(fetchFullProfile());
    } catch (error) {
        console.log(error);
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
    dispatch(deleteListRequest());
    try {
        const response = await a.request(`api/list/${listId}`, {
            method: 'DELETE'
        });
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
    dispatch(addMovieToListRequest());
    try {
        //const response = await postListMovie(listId, movieId, userSessionId);
        const resposne = await a.request(`api/list/${listId}/add-item`, {
            method: 'POST', 
            data: {
                movieId
            }
        });
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
    dispatch(removeMovieFromListRequest());
    try {
        //const response = await postRemoveListMovie(listId, movieId, userSessionId);
        // Since this thunk can be dispatch from the individual list view, the _SUCCESS
        // action needs to update the list slice of state by removing the movie
        const response = await a.request(`api/list/${listId}/remove-item`, {
            method: 'POST',
            data: {
                movieId
            }
        });
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
    dispatch(clearListRequest());
    try {
        const response = await a.request(`api/list/${listId}/clear`, {
            method: 'POST'
        });
        dispatch(clearListSuccess(listId));
    } catch (error) {
        dispatch(clearListFailed(error));
    }
}
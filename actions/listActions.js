import * as actionTypes from '../actionTypes';
import { getSessionType } from '../reducers/sessionReducer';
import { getMovieData } from '../reducers/movieReducer';
import { fetchFullProfile } from './userActions';
import { a } from '../axiosClient';
import toast from '../toast';
import Router from 'next/router';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const fetchListRequest = (id) => ({
    type: actionTypes.FETCH_LIST_REQUEST,
    payload: {
        id
    }
});

const fetchListSuccess = (data, id) => ({
    type: actionTypes.FETCH_LIST_SUCCESS,
    payload: {
        data,
        id
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
        dispatch(fetchListSuccess(response.data, listId));
    } catch (error) {
        dispatch(fetchListFailed(error));
        throw new Error(error.response.status);
    }
}

const createListOptimisticRequest = (list, transactionId) => ({
    type: actionTypes.CREATE_LIST_OPTIMISTIC_REQUEST,
    payload: {
        list
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const createListSuccess = (id, transactionId) => ({
    type: actionTypes.CREATE_LIST_SUCCESS,
    payload: {
        id
    },
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const createListFailed = (transactionId) => ({
    type: actionTypes.CREATE_LIST_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const createList = (listName, listDescription, listLanguage) => async (dispatch, getState) => {
    try {
        const temporaryListData = {
            description: listDescription || '',
            favorite_count: 0,
            id: -1,
            item_count: 0,
            iso_639_1: 'en',
            list_type: 'movie',
            name: listName,
            poster_path: null
        };
        const transactionId = Date.now();
        dispatch(createListOptimisticRequest(temporaryListData, transactionId));
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
        dispatch(createListSuccess(response.data.list_id, transactionId));
        toast.success('List successfully created');
    } catch (error) {
        dispatch(createListFailed(transactionId));
        toast.error(error.response.data);
    }
}

const deleteListOptimisticRequest = (id, transactionId) => ({
    type: actionTypes.DELETE_LIST_OPTIMISTIC_REQUEST,
    payload: {
        id
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const deleteListSuccess = (transactionId) => ({
    type: actionTypes.DELETE_LIST_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const deleteListFailed = (transactionId) => ({
    type: actionTypes.DELETE_LIST_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const deleteList = (listId) => async (dispatch, getState) => {
    
    try {
        const transactionId = Date.now();
        dispatch(deleteListOptimisticRequest(listId, transactionId));
        Router.push({ pathname: '/me/lists' });
        const response = await a.request(`api/list/${listId}`, {
            method: 'DELETE'
        });
        dispatch(deleteListSuccess(transactionId));
        toast.success('List successfully deleted');
    } catch (error) {
        dispatch(deleteListFailed(transactionId));
        toast.error(error.response.data);
    }
}

const addMovieToListOptimisticRequest = (movie, listId, transactionId) => ({
    type: actionTypes.ADD_MOVIE_TO_LIST_OPTIMISTIC_REQUEST,
    payload: {
        movie,
        listId
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const addMovieToListSuccess = (transactionId) => ({
    type: actionTypes.ADD_MOVIE_TO_LIST_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const addMovieToListFailed = (error, transactionId) => ({
    type: actionTypes.ADD_MOVIE_TO_LIST_FAILED,
    payload: {
        error
    },
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

function formatMovieForList(m) {
    return {
        poster_path: m.poster_path,
        popularity: m.popularity,
        vote_count: m.vote_count,
        video: m.video,
        media_type: 'movie',
        id: m.id,
        adult: m.adult,
        backdrop_path: m.backdrop_path,
        original_language: m.original_language,
        original_title: m.original_title,
        genre_ids: m.genres,
        title: m.title,
        vote_average: m.vote_average,
        overview: m.overview,
        release_date: m.release_date,
    }
}

export const addMovieToList = (listId, movieId) => async (dispatch, getState) => {
    const transactionId = Date.now();
    try {
        const state = getState();
        const movieData = getMovieData(state);
        const formattedMovieObject = formatMovieForList(movieData);
        dispatch(addMovieToListOptimisticRequest(formattedMovieObject, listId, transactionId));
        const response = await a.request(`api/list/${listId}/add-item`, {
            method: 'POST', 
            data: {
                movieId
            }
        });
        dispatch(addMovieToListSuccess(transactionId));
        toast.success('Successfully added to list');
    } catch (error) {
        dispatch(addMovieToListFailed(error, transactionId));
        toast.error(error.response.data);
    }
}

const removeMovieFromListOptimisticRequest = (listId, movieId, transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_OPTIMISTIC_REQUEST,
    payload: {
        listId,
        movieId
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const removeMovieFromListSuccess = (transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const removeMovieFromListFailed = (error, transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_FAILED,
    payload: {
        error
    },
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const removeMovieFromList = (listId, movieId) => async (dispatch, getState) => {
    try {
        const transactionId = Date.now();
        dispatch(removeMovieFromListOptimisticRequest(listId, movieId, transactionId));
        const response = await a.request(`api/list/${listId}/remove-item`, {
            method: 'POST',
            data: {
                movieId
            }
        });
        dispatch(removeMovieFromListSuccess(transactionId));
        toast.success('Movie successfully removed from list');
    } catch (error) {
        dispatch(removeMovieFromListFailed(error, transactionId));
        toast.error(error.response.data);
    }
};

const clearListOptimisticRequest = (id, transactionId) => ({
    type: actionTypes.CLEAR_LIST_OPTIMISTIC_REQUEST,
    payload: {
        id
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const clearListSuccess = (transactionId) => ({
    type: actionTypes.CLEAR_LIST_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const clearListFailed = (error, transactionId) => ({
    type: actionTypes.CLEAR_LIST_FAILED,
    optimist: {
        type: REVERT,
        id: transactionid
    }
});

export const clearList = (listId) => async (dispatch, getState) => {
    try {
        const transactionId = Date.now();
        dispatch(clearListOptimisticRequest(listId, transactionId));
        const response = await a.request(`api/list/${listId}/clear`, {
            method: 'POST'
        });
        dispatch(clearListSuccess(transactionId));
        toast.success('List successfully cleared');
    } catch (error) {
        console.log(error);
        dispatch(clearListFailed(error, transactionId));
        toast.error(error.response.data);
    }
}
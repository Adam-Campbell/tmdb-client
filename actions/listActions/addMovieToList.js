import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import { getMovieData } from '../../reducers/movieReducer';

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

const formatMovieForList = (m) => ({
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
    release_date: m.release_date
});

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
};

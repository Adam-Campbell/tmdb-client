import * as actionTypes from '../actionTypes';
import { getMovieId, getMovieData } from '../reducers/movieReducer';
import { getUserSessionId } from '../reducers/sessionReducer';
import { getMovieDetails, postMovieRating, deleteMovieRating } from '../Api';
import { a } from '../axiosClient';

const fetchMovieRequest = () => ({
    type: actionTypes.FETCH_MOVIE_REQUEST
});

const fetchMovieSuccess = (data, id) => ({
    type: actionTypes.FETCH_MOVIE_SUCCESS,
    payload: {
        data,
        id
    }
});

const fetchMovieFailed = (error) => ({
    type: actionTypes.FETCH_MOVIE_FAILED,
    payload: {
        error
    }
});


export const fetchMovie = (id) => async (dispatch, getState) => {
    const state = getState();
    if (id === getMovieId(state)) return;
    dispatch(fetchMovieRequest());
    try {
        //const response = await getMovieDetails(id, getUserSessionId(state));
        const response = await a.get(`api/movie/${id}`);
        dispatch(fetchMovieSuccess(response.data, id));
    } catch (error) {
        dispatch(fetchMovieFailed(error));
    }
}


const rateMovieSuccess = (rating, id) => ({
    type: actionTypes.RATE_MOVIE_SUCCESS,
    payload: {
        rating,
        id
    }
});

const rateMovieFailed = (error) => ({
    type: actionTypes.RATE_MOVIE_FAILED,
    payload: {
        error
    }
});

export const rateMovie = (rating, movieId) => async (dispatch, getState) => {
    //console.log('rateMovie called with: ', rating, movieId);
    const state = getState();
    const session_id = getUserSessionId(state);
    if (!session_id) {
        dispatch(rateMovieFailed('User not logged in'));
        return;
    }
    try {
        const response = await postMovieRating(rating, movieId, session_id);
        console.log(response);
        console.log(rating, movieId);
        dispatch(rateMovieSuccess(rating, movieId));
    } catch (error) {
        console.log(error);
        dispatch(rateMovieFailed(error));
    }
}

const removeMovieRatingSuccess = (id) => ({
    type: actionTypes.REMOVE_MOVIE_RATING_SUCCESS,
    payload: {
        id
    }
});

const removeMovieRatingFailed = (error) => ({
    type: actionTypes.REMOVE_MOVIE_RATING_FAILED,
    payload: {
        error
    }
});

export const removeMovieRating = (movieId) => async (dispatch, getState) => {
    const state = getState();
    const session_id = getUserSessionId(state);
    if (!session_id) {
        dispatch(removeMovieRatingFailed('User not logged in'));
        return;
    }
    try {
        const response = await deleteMovieRating(movieId, session_id);
        dispatch(removeMovieRatingSuccess(movieId));
    } catch (error) {
        console.log(error);
        dispatch(removeMovieRatingFailed(error));
    }
}

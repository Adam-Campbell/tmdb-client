import * as actionTypes from '../actionTypes';
import { getMovieId, getMovieData } from '../reducers/movieReducer';
import { getHasSession } from '../reducers/sessionReducer';
import { a } from '../axiosClient';
import toast from '../toast';

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


export const fetchMovie = (id, ssrHeaders = {}) => async (dispatch, getState) => {
    const state = getState();
    if (id === getMovieId(state)) return;
    dispatch(fetchMovieRequest());
    try {
        const response = await a.get(`api/movie/${id}`, {
            headers: ssrHeaders
        });
        const movieData = response.data;
        movieData.credits.cast = movieData.credits.cast.sort((a,b) => a.order - b.order);
        dispatch(fetchMovieSuccess(movieData, id));
    } catch (error) {
        dispatch(fetchMovieFailed(error));
        throw new Error(error.response.status);
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
    const state = getState();
    if (!getHasSession(state)) {
        dispatch(rateMovieFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    try {
        
        const response = await a.request(`api/movie/${movieId}/rating`, {
            params: { rating },
            method: 'POST'
        });
        dispatch(rateMovieSuccess(rating, movieId));
        toast.success('Movie successfully rated');
    } catch (error) {
        dispatch(rateMovieFailed(error));
        toast.error(error.response.data);
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
    if (!getHasSession(state)) {
        dispatch(removeMovieRatingFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    try {
        const response = await a.request(`api/movie/${movieId}/rating`, {
            method: 'DELETE'
        });
        dispatch(removeMovieRatingSuccess(movieId));
        toast.success('Movie rating successfully removed');
    } catch (error) {
        dispatch(removeMovieRatingFailed(error));
        toast.error(error.response.data);
    }
}

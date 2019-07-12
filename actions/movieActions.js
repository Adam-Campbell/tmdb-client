import * as actionTypes from '../actionTypes';
import { getMovieId, getMovieData } from '../reducers/movieReducer';
import { getUserSessionId } from '../reducers/sessionReducer';
import { getMovieDetails, postMovieRating } from '../Api';

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


/*

    fetchMovie

    First, check if the movie is already in state - if it is then just return early.

    If it isn't we need to perform some type of fetch. Dispatch the _REQUEST action.

    Check whether the user is logged in or not. The exact request made will differ based upon this.

    Make relevant request, dispatch the _SUCCESS or _FAIL action as needed. 



*/

export const fetchMovie = (id) => async (dispatch, getState) => {
    const state = getState();
    if (id === getMovieId(state)) return;
    dispatch(fetchMovieRequest());
    try {
        const response = await getMovieDetails(id, getUserSessionId(state));
        dispatch(fetchMovieSuccess(response, id));
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
    const state = getState();
    const session_id = getUserSessionId(state);
    if (!session_id) {
        dispatch(rateMovieFailed('User not logged in'));
        return;
    }
    try {
        const response = await postMovieRating(rating, movieId, session_id);
        dispatch(rateMovieSuccess(rating, movieId));
    } catch (error) {
        dispatch(rateMovieFailed(error));
    }
}



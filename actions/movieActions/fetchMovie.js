import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import { getMovieId } from '../../reducers/movieReducer';

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
    try {
        dispatch(fetchMovieRequest());
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
};

import * as actionTypes from '../actionTypes';
import { getSessionType, getUserSessionId } from '../reducers/sessionReducer';
import { hasGotUserSummary, getUserId } from '../reducers/user';
import { getUserDataStatus } from '../reducers/user/dataStatusReducer';
import { 
    fetchUserSummary, 
    postFavourite, 
    postWatchlist,
    getCreatedLists,
    getFavouriteMovies,
    getFavouriteShows, 
    getRatedMovies,
    getRatedShows, 
    getRatedEpisodes,
    getMovieWatchlist,
    getShowWatchlist
} from '../Api';
import axios from 'axios';

const storeUserSummary = (userSummary) => ({
    type: actionTypes.STORE_USER_SUMMARY,
    payload: {
        userSummary
    }
});

export const getUserSummary = () => async (dispatch, getState) => {
    const state = getState();
    if (getSessionType(state) === 'USER' && !hasGotUserSummary(state)) {
        try {
            const userSessionId = getUserSessionId(state);
            const userSummary = await fetchUserSummary(userSessionId);
            dispatch(storeUserSummary(userSummary));
        } catch (err) {
            console.log(err);
        }
    }
}

const loginUserRequest = () => ({
    type: actionTypes.LOGIN_USER_REQUEST
});

const loginUserSuccess = (userSessionId) => ({
    type: actionTypes.LOGIN_USER_SUCCESS,
    payload: {
        userSessionId
    }
});

const loginUserFailed = (error) => ({
    type: actionTypes.LOGIN_USER_FAILED,
    payload: {
        error
    }
});

export const loginUser = (request_token) => async (dispatch, getState) => {
    const state = getState();
    if (!request_token || hasGotUserSummary(state)) return;
    try {
        const response = await axios.request(`http://localhost:3000/api/usersession`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                request_token
            }
        });
        const userSessionId = response.data.session_id.session_id;
        dispatch(loginUserSuccess(userSessionId));
        dispatch(getUserSummary());
    } catch (err) {
        dispatch(loginUserFailed(err));
    }
} 


export const logoutUser = () => async (dispatch, getState) => {
    try {
        const response = await axios.delete('http://localhost:3000/api/usersession');
        dispatch({
            type: actionTypes.LOGOUT_USER
        });
    } catch (err) {
        console.log(err);
    }
}


const markFavouriteSuccess = (id, mediaType, isMarking) => ({
    type: actionTypes.MARK_FAVOURITE_SUCCESS,
    payload: {
        id,
        mediaType,
        isMarking
    }
});

const markFavouriteFailed = (error) => ({
    type: actionTypes.MARK_FAVOURITE_FAILED,
    payload: {
        error
    }
});

export const markFavourite = (mediaType, mediaId, isMarking) => async (dispatch, getState) => {
    const state = getState();
    const sessionId = getUserSessionId(state);
    const accountId = getUserId(state);
    if (!sessionId) {
        dispatch(markFavouriteFailed('User is not logged in'));
        return;
    }

    try {
        const response = await postFavourite(mediaType, mediaId, isMarking, accountId, sessionId);
        //console.log(response);
        dispatch(markFavouriteSuccess(mediaId, mediaType, isMarking));
    } catch (error) {
        dispatch(markFavouriteFailed(error));
    }
}


const editWatchlistSuccess = (id, mediaType, isAdding) => ({
    type: actionTypes.EDIT_WATCHLIST_SUCCESS,
    payload: {
        id,
        mediaType,
        isAdding
    }
});

const editWatchlistFailed = (error) => ({
    type: actionTypes.EDIT_WATCHLIST_FAILED,
    payload: {
        error
    }
});

export const editWatchlist = (mediaType, mediaId, isAdding) => async (dispatch, getState) => {
    console.log('editWatchlist was called!');
    const state = getState();
    const sessionId = getUserSessionId(state);
    const accountId = getUserId(state);
    if (!sessionId) {
        dispatch(editWatchlistFailed('User is not logged in'));
        return;
    }

    try {
        const response = await postWatchlist(mediaType, mediaId, isAdding, accountId, sessionId);
        //console.log(response);
        dispatch(editWatchlistSuccess(mediaId, mediaType, isAdding));
    } catch (error) {
        dispatch(editWatchlistFailed(error));
    }
}

const fetchFullProfileRequest = () => ({
    type: actionTypes.FETCH_FULL_PROFILE_REQUEST
});

const fetchFullProfileSuccess = (createdLists, favourites, rated, watchlists) => ({
    type: actionTypes.FETCH_FULL_PROFILE_SUCCESS,
    payload: {
        createdLists,
        favourites,
        rated,
        watchlists,
        timestamp: Date.now()
    }
});


const fetchFullProfileFailed = (error) => ({
    type: actionTypes.FETCH_FULL_PROFILE_FAILED,
    payload: {
        error
    }
});

export const fetchFullProfile = () => async (dispatch, getState) => {
    
    const state = getState();

    // If we have somehow called this without there being a user session then return immediately
    if (getSessionType(state) !== 'USER') return;

    const { hasFetched, fetchedAt, isInvalidated } = getUserDataStatus(state); 
    // If all of these conditions are met then the data is present and still considered fresh, so
    // return without fetching.
    if (
        hasFetched && 
        Date.now() - fetchedAt <= 1000 * 60 * 10 && 
        !isInvalidated
    ) {
        return;
    }

    try {
        const userSessionId = getUserSessionId(state);
        const userId = getUserId(state);
        const [
            createdLists,
            favouriteMovies,
            favouriteShows,
            ratedMovies,
            ratedShows,
            ratedEpisodes,
            movieWatchlist,
            showWatchlist
        ] = await Promise.all([
            getCreatedLists(userId, userSessionId),
            getFavouriteMovies(userId, userSessionId),
            getFavouriteShows(userId, userSessionId), 
            getRatedMovies(userId, userSessionId),
            getRatedShows(userId, userSessionId), 
            getRatedEpisodes(userId, userSessionId),
            getMovieWatchlist(userId, userSessionId),
            getShowWatchlist(userId, userSessionId)
        ])
        .then(results => results.map(r => r.data.results));
        const favourites = {
            movies: favouriteMovies,
            shows: favouriteShows
        };
        const rated = {
            movies: ratedMovies,
            shows: ratedShows,
            episodes: ratedEpisodes
        };
        const watchlists = {
            movies: movieWatchlist,
            shows: showWatchlist
        };
        dispatch(fetchFullProfileSuccess(createdLists, favourites, rated, watchlists));
    } catch (error) {
        console.log(error);
        dispatch(fetchFullProfileFailed(error));
    }
}

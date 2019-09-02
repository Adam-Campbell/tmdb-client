import * as actionTypes from '../actionTypes';
import { getHasSession } from '../reducers/sessionReducer';
import { hasGotUserSummary, getUserId } from '../reducers/user';
import { getUserDataStatus } from '../reducers/user/dataStatusReducer';
import { a } from '../axiosClient';
import toast from '../toast';

const storeUserSummary = (userSummary) => ({
    type: actionTypes.STORE_USER_SUMMARY,
    payload: {
        userSummary
    }
});

export const getUserSummary = (ssrHeaders = {}) => async (dispatch, getState) => {
    const state = getState();
    if (getHasSession(state) && !hasGotUserSummary(state)) {
        try {
            const userSummary = await a.get('api/user/summary', {
                headers: { ...ssrHeaders }
            });
            dispatch(storeUserSummary(userSummary.data));
        } catch (err) {
            console.log(err);
        }
    }
}

const loginUserRequest = () => ({
    type: actionTypes.LOGIN_USER_REQUEST
});

const loginUserSuccess = () => ({
    type: actionTypes.LOGIN_USER_SUCCESS
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
        const response = await a.request(`api/session`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                request_token
            }
        });
        console.log(response);
        dispatch(loginUserSuccess());
        dispatch(getUserSummary());
    } catch (err) {
        dispatch(loginUserFailed(err));
    }
} 


export const logoutUser = () => async (dispatch, getState) => {
    try {
        const response = await a.delete('api/session');
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

export const markFavourite = (mediaType, mediaId, isFavouriting) => async (dispatch, getState) => {
    const state = getState();
    const accountId = getUserId(state);
    if (!getHasSession(state)) {
        dispatch(markFavouriteFailed('User is not logged in'));
        toast.error('Login required to perform this action');
        return;
    }

    try {
        const response = await a.request(`api/user/${accountId}/favorite`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            data: {
                mediaType,
                mediaId,
                isFavouriting
            }
        });
        dispatch(markFavouriteSuccess(mediaId, mediaType, isFavouriting));
        const mediaTypeDescription = mediaType === 'movie' ? 'Movie' : 'TV show';
        const actionDescription = isFavouriting ? 'added to' : 'removed from';
        toast.success(`${mediaTypeDescription} successfully ${actionDescription} favourites`);
    } catch (error) {
        dispatch(markFavouriteFailed(error));
        toast.error(error.response.data);
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
    const accountId = getUserId(state);
    if (!getHasSession(state)) {
        dispatch(editWatchlistFailed('User is not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    try {
        const response = await a.request(`api/user/${accountId}/watchlist`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            data: {
                mediaType,
                mediaId,
                isAdding
            }
        });
        dispatch(editWatchlistSuccess(mediaId, mediaType, isAdding));
        const mediaTypeDescription = mediaType === 'movie' ? 'Movie' : 'TV show';
        const actionDescription = isAdding ? 'added to' : 'removed from';
        toast.success(`${mediaTypeDescription} successfully ${actionDescription} watchlist`);
    } catch (error) {
        dispatch(editWatchlistFailed(error));
        toast.error(error.response.data);
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

export const fetchFullProfile = (ssrHeaders = {}) => async (dispatch, getState) => {
    
    const state = getState();

    // If we have somehow called this without there being a user session then return immediately
    if (!getHasSession(state)) return;

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

        const userId = getUserId(state);
        const {
            data: {
                createdLists,
                favourites,
                rated,
                watchlists
            }
        } = await a.get(`api/user/${userId}/profile`, { 
            headers: ssrHeaders    
        });

        dispatch(fetchFullProfileSuccess(createdLists, favourites, rated, watchlists));
    } catch (error) {
        dispatch(fetchFullProfileFailed(error));
        throw new Error(error.response.status);
    }
}
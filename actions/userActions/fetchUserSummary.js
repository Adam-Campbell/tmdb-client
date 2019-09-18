import * as actionTypes from '../../actionTypes';
import { getHasSession } from '../../reducers/sessionReducer';
import { hasGotUserSummary } from '../../reducers/user';
import { a } from '../../axiosClient';
import toast from '../../toast';

const fetchUserSummaryRequest = () => ({
    type: actionTypes.FETCH_USER_SUMMARY_REQUEST
});

const fetchUserSummarySuccess = (userSummary) => ({
    type: actionTypes.FETCH_USER_SUMMARY_SUCCESS,
    payload: {
        userSummary
    }
});

const fetchUserSummaryFailed = () => ({
    type: actionTypes.FETCH_USER_SUMMARY_FAILED
})

export const fetchUserSummary = (ssrHeaders = {}) => async (dispatch, getState) => {
    const state = getState();
    if (getHasSession(state) && !hasGotUserSummary(state)) {
        try {
            dispatch(fetchUserSummaryRequest());
            const userSummary = await a.get('api/user/summary', {
                headers: { ...ssrHeaders }
            });
            dispatch(fetchUserSummarySuccess(userSummary.data));
        } catch (err) {
            console.log(err);
            dispatch(fetchUserSummaryFailed());
            toast.error('A problem was encountered when trying to fetch your profile information');
        }
    }
}
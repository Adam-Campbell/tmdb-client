import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';

export const logoutUser = () => async (dispatch, getState) => {
    try {
        const response = await a.delete('api/session');
        dispatch({
            type: actionTypes.LOGOUT_USER
        });
    } catch (err) {
        console.log(err);
    }
};

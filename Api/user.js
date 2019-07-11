import { get, a } from './helpers';

export const fetchUserSummary = async (session_id) => {
    console.log('fetchUserSummary called with: ', session_id);
    const response = await get('account', { session_id });
    //const 
    return response.data;
}

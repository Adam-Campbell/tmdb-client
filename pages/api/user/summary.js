import { a, get } from '../../../axiosServer';
import api_key from '../../../apiKey';
import { parse } from 'cookie';

export default async function handler(req, res) {
    const { userSessionId } = parse(req.headers.cookie || '');
    if (userSessionId) {
        try {
            const response = await get('account', { session_id: userSessionId });
            res.json(response.data);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(401);
    }
}
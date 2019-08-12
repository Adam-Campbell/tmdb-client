// A GET request to this endpoint will send a request to TMdb to get a request
// token - that is the token that allows you to try and initiate a session for
// the user. 
import { get } from '../../axiosServer';

export default async function handler(req, res) {
    try {
        const response = await get('authentication/token/new');
        const { request_token } = response.data;
        res.json({ request_token });
    } catch (error) {
        console.log(error);
    }
}
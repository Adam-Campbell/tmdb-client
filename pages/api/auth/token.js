import { get } from '../../../axiosServer';

export default async function handler(req, res) {
    try {
        const response = await get('authentication/token/new');
        res.json({ request_token: response.data.request_token });
    } catch (error) {
        console.log(error);
    }
}
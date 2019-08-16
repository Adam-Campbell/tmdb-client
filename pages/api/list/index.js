import { a, get } from '../../../axiosServer';
import api_key from '../../../apiKey';
import { apiMethodHandler } from '../../../utils';

async function handlePost(req, res) {
    const { userSessionId } = req.cookies;
    const { name, description } = req.body;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    if (!name) {
        res.status(400).end();
        return;
    }
    try {
        const response = await a.request('list', {
            params: {
                api_key,
                session_id: userSessionId
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            data: {
                name,
                description
            }
        });
        res.json(response.data);
    } catch (error) {   
        console.log(error);
    }
}

export default apiMethodHandler({ POST: handlePost });

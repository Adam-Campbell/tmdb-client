import { a, get } from '../../../../axiosServer';
import { apiMethodHandler } from '../../../../utils';

async function handlePost(req, res) {
    const { userSessionId } = req.cookies;
    const { listId } = req.query;
    const { movieId } = req.body;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    if (!movieId) {
        res.status(400).end();
        return;
    }
    try {
        const response = await a.request(`list/${listId}/add_item`, {
            params: {
                api_key: process.env.API_KEY,
                session_id: userSessionId
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            data: {
                media_id: movieId
            }
        });
        res.status(204).end();
    } catch (error) {
        res.status(error.response.status).json(error.response.data.status_message);
    }
}

export default apiMethodHandler({ POST: handlePost });
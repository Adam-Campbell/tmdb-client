import { a, get } from '../../../../axiosServer';
import { apiMethodHandler } from '../../../../utils';

async function handlePost(req, res) {
    const { userSessionId } = req.cookies;
    const { listId } = req.query;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    try {
        const response = await a.request(`list/${listId}/clear`, {
            params: {
                api_key: process.env.API_KEY,
                session_id: userSessionId,
                confirm: true
            },
            method: 'POST'
        });
        res.status(204).end();
    } catch (error) {
        res.status(error.response.status).json(error.response.data.status_message);
    }
}

export default apiMethodHandler({ POST: handlePost });
import { a, get } from '../../../../axiosServer';
import api_key from '../../../../apiKey';
import { apiMethodHandler } from '../../../../utils';

async function handleGet(req, res) {
    const { listId } = req.query;
    try {
        const response = await get(`list/${listId}`);
        res.json(response.data); 
    } catch (error) {
        res.status(error.response.status).end();
    }
}

async function handleDelete(req, res) {
    const { userSessionId } = req.cookies;
    const { listId } = req.query;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    try {
        const response = await a.request(`list/${listId}`, {
            params: {
                api_key,
                session_id: userSessionId
            },
            method: 'DELETE'
        });
        res.status(204).end();
    } catch (error) {
        if (error.response && error.response.status === 500) {
            // TMdb API gives a 500 error here incorrectly.
            res.status(204).end();
            return;
        }
        console.log(error);
    }
}

export default apiMethodHandler({
    GET: handleGet,
    DELETE: handleDelete
});

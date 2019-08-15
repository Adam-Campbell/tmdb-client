import { a, get } from '../../../../axiosServer';
import api_key from '../../../../apiKey';

// This route will handle POST requests, and will remove a movie from the list
// specified by listId.

export default async function handler(req, res) {
    if (req.method === 'POST') {
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
            const response = await a.request(`list/${listId}/remove_item`, {
                params: {
                    api_key,
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
            console.log(error);
        }
    } else {
        res.setHeader('Allow', 'POST')
        .status(405)
        .end();
    }
}
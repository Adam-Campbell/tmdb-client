import { a, get } from '../../../../axiosServer';
import api_key from '../../../../apiKey';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userSessionId } = req.cookies;
        const { listId } = req.query;
        if (!userSessionId) {
            res.status(401).end();
            return;
        }
        try {
            const response = await a.request(`list/${listId}/clear`, {
                params: {
                    api_key,
                    session_id: userSessionId,
                    confirm: true
                },
                method: 'POST'
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
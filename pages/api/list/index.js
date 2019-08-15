import { a, get } from '../../../axiosServer';
import api_key from '../../../apiKey';

export default async function handler(req, res) {
    if (req.method === 'POST') {
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
    } else {
        res.setHeader('Allow', 'POST')
        .status(405)
        .end();
    }
}

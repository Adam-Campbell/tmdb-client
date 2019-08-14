import { a } from '../../../../axiosServer';
import api_key from '../../../../apiKey';

async function handlePost(req, res) {
    const { userSessionId } = req.cookies;
    const { movieId, rating } = req.query;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    if (!movieId || rating === undefined) {
        res.status(400).end();
        return;
    }
    try {
        const response = await a.request(`movie/${movieId}/rating`, {
            params: {
                api_key,
                session_id: userSessionId
            },
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                value: rating
            }
        });
        res.status(204).end();
    } catch (error) {
        console.log(error);
    }

}

async function handleDelete(req, res) {
    const { userSessionId } = req.cookies;
    const { movieId } = req.query;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    if (!movieId) {
        res.status(400).end();
        return;
    }
    try {
        const response = await a.request(`movie/${movieId}/rating`, {
            params: {
                api_key,
                session_id: userSessionId
            },
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        });
        res.status(204).end();
    } catch (error) {
        console.log(error);
    }
}

export default async function handler(req, res) {
    console.log('')
    if (req.method === 'POST') {
        handlePost(req, res);
    } else if (req.method === 'DELETE') {
        handleDelete(req, res);
    } else {
        res.setHeader('Allow', 'POST, DELETE')
        .status(405)
        .end();
    }
}
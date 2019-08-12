import { serialize } from 'cookie';
import { a } from '../../axiosServer';
import api_key from '../../apiKey';

// A POST request to this endpoint will create a new user session using a pre-authenticated
// token. A DELETE request to this endpoint will terminate the session, and delete the cookie. 

async function handlePost(req, res) {
    const { request_token } = req.body;
    if (!request_token) {
        res.status(401).json({ error: 'No request token provided' });
    }
    try {
        const response = await a.request(`authentication/session/new`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            params: {
                api_key: API_KEY
            },
            data: {
                request_token
            }
        });
        const sessionId = response.data.session_id;
        const cookie = serialize('userSessionId', String(sessionId), {
            maxAge: 60 * 60 * 24 * 30, // 1 month
            domain: 'localhost',
            httpOnly: true,
            secure: false,
            path: '/'
        });
        res.setHeader('Set-Cookie', cookie);
        res.status(204);
    } catch (error) {
        console.log(error);
    }
}

async function handleDelete(req, res) {
    const cookie = serialize('userSessionId', '', {
        maxAge: 0,
        domain: 'localhost',
        httpOnly: true,
        secure: false,
        path: '/'
    });
    res.setHeader('Set-Cookie', cookie);
    res.status(204);
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        handlePost(req, res);
    } else if (req.method === 'DELETE') {
        handleDelete(req, res);
    }
}


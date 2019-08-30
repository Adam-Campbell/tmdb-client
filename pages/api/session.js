import { serialize } from 'cookie';
import { a } from '../../axiosServer';
import api_key from '../../apiKey';
import { apiMethodHandler } from '../../utils';

// A POST request to this endpoint will create a new user session using a pre-authenticated
// token. A DELETE request to this endpoint will terminate the session, and delete the cookie. 

async function handlePost(req, res) {
    const { request_token } = req.body;
    if (!request_token) {
        res.status(401).json({ error: 'No request token provided' });
    }
    try {
        const response = await a.request('authentication/session/new', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            params: {
                api_key
            },
            data: {
                request_token
            }
        });
        const sessionId = response.data.session_id;
        const cookie = serialize('userSessionId', String(sessionId), {
            maxAge: 60 * 60 * 24 * 30, // 1 month
            expires: new Date(Date.now() + (60 * 60 * 24 * 30)), // 1 month
            //domain: 'localhost',
            httpOnly: true,
            secure: false,
            path: '/'
        });
        res.setHeader('Set-Cookie', cookie);
        res.status(204).end();
    } catch (error) {
        console.log(error);
    }
}

async function handleDelete(req, res) {
    const { userSessionId } = req.cookies;
    if (!userSessionId) {
        res.status(401).end();
    }
    try {
        const response = await a.request('authentication/session', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            params: {
                api_key
            },
            data: {
                session_id: userSessionId
            }
        });
        const cookie = serialize('userSessionId', '', {
            maxAge: 0,
            //domain: 'localhost',
            httpOnly: true,
            secure: false,
            path: '/'
        });
        res.setHeader('Set-Cookie', cookie);
        res.status(204).end();
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({
    POST: handlePost,
    DELETE: handleDelete
});

const axios = require('axios');
const API_KEY = require('./apiKey');
const router = require('express').Router();

const a = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

const get = (url, params = {}) => a.get(url, {
    params: {
        api_key: API_KEY,
        ...params
    }
});

router.route('/usersession')
    .post(async (req, res) => {
        const { request_token } = req.body;
        if (!request_token) {
            res.status(401).send();
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
            res.cookie(
                'userSessionId', 
                sessionId, 
                { maxAge: 3600000000, domain: 'localhost', httpOnly: false, secure: false }
            );
            res.json({
                session_id: response.data
            });
        } catch (err) {
            console.log(err);
        }
    })

    .delete(async (req, res) => {
        const { userSessionId } = req.cookies;
        if (!userSessionId) {
            res.status(401).send();
        }
        try {
            const confirmation = await a.request('authentication/session', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                params: {
                    api_key: API_KEY
                },
                data: {
                    session_id: userSessionId
                }
            });
            //console.log(confirmation);
            res.clearCookie('userSessionId');
            res.status(204).send();
        } catch (err) {
            console.log(err);
        }
    })


module.exports = router;
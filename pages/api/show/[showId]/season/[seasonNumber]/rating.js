import { a } from '../../../../../../axiosServer';
import api_key from '../../../../../../apiKey';
import { apiMethodHandler } from '../../../../../../utils';

async function handlePost(req, res) {
    const { userSessionId } = req.cookies;
    const { showId, seasonNumber, episodeNumber, rating } = req.query;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    if (!showId || !rating || (!seasonNumber && seasonNumber !== 0) || !episodeNumber) {
        res.status(400).end();
        return;
    }
    try {
        const response = await a.request(`tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/rating`, {
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
    const { showId, seasonNumber, episodeNumber } = req.query;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    if (!showId || seasonNumber === undefined || episodeNumber === undefined) {
        res.status(400).end();
        return;
    }
    try {
        const response = await a.request(`tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/rating`, {
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

export default apiMethodHandler({
    POST: handlePost,
    DELETE: handleDelete
});

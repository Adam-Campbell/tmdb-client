import { a } from '../../../../axiosServer';
import api_key from '../../../../apiKey';
import { apiMethodHandler } from '../../../../utils';

async function handlePost(req, res) {
    const { userSessionId } = req.cookies;
    const { userId } = req.query;
    const { mediaType, mediaId, isAdding } = req.body;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    if (!mediaType || !mediaId || isAdding === undefined) {
        res.status(400).end();
        return;
    }
    
    try {
        const response = await a.request(`account/${userId}/watchlist`, {
            params: {
                api_key,
                session_id: userSessionId
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            data: {
                media_type: mediaType,
                media_id: parseInt(mediaId),
                watchlist: Boolean(isAdding)
            }
        });
        res.status(204).end();
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ POST: handlePost });

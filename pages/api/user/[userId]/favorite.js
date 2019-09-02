import { a } from '../../../../axiosServer';
import { apiMethodHandler } from '../../../../utils';

async function handlePost(req, res) {
    const { userSessionId } = req.cookies;
    const { userId } = req.query;
    const { mediaType, mediaId, isFavouriting } = req.body;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    if (!mediaType || !mediaId || isFavouriting === undefined) {
        res.status(400).end();
        return;
    }
    
    try {
        const response = await a.request(`account/${userId}/favorite`, {
            params: {
                api_key: process.env.API_KEY,
                session_id: userSessionId
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            data: {
                media_type: mediaType,
                media_id: parseInt(mediaId),
                favorite: Boolean(isFavouriting)
            }
        });
        res.status(204).end();
    } catch (error) {
        res.status(error.response.status).json(error.response.data.status_message);
    }
}

export default apiMethodHandler({ POST: handlePost });
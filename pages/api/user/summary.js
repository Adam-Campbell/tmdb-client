import { a, get } from '../../../axiosServer';
import api_key from '../../../apiKey';
import { apiMethodHandler } from '../../../utils';

async function handleGet(req, res) {
    const { userSessionId } = req.cookies;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    try {
        const response = await get('account', { session_id: userSessionId });
        res.json(response.data);
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ GET: handleGet });

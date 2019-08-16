import { get } from '../../../../axiosServer';
import { apiMethodHandler } from '../../../../utils';

async function handleGet(req, res) {
    // Check for presence of user session cookie and set the params for the request accordingly
    const { movieId } = req.query;
    const { userSessionId } = req.cookies;
    const baseAppends = 'credits,images,recommendations,similar,reviews,external_ids,keywords,lists';
    const paramsObject = userSessionId ? ({
        append_to_response: baseAppends + ',account_states',
        session_id: userSessionId
    }) : ({
        append_to_response: baseAppends
    });

    try {
        const response = await get(`movie/${movieId}`, paramsObject);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ GET: handleGet });
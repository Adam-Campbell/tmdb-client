import { get } from '../../../../axiosServer';

export default async function handler(req, res) {
    // Check for presence of user session cookie and set the params for the request accordingly
    const { showId } = req.query;
    const { userSessionId } = req.cookies;
    const baseAppends = 'credits,images,recommendations,similar,reviews,external_ids,keywords';
    const paramsObject = userSessionId ? ({
        append_to_response: baseAppends + ',account_states',
        session_id: userSessionId
    }) : ({
        append_to_response: baseAppends
    });

    try {
        const response = await get(`tv/${showId}`, paramsObject);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
    }
}
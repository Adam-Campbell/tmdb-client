import { get } from '../../../../../../axiosServer';

export default async function handler(req, res) {
    const { showId, seasonNumber } = req.query;
    const { userSessionId } = req.cookies;
    const baseAppends = 'credits,images';
    const paramsObject = userSessionId ? ({
        append_to_response: baseAppends + ',account_states',
        session_id: userSessionId
    }) : ({
        append_to_response: baseAppends
    });
    try {
        const response = await get(`tv/${showId}/season/${seasonNumber}`, paramsObject);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
    }
}
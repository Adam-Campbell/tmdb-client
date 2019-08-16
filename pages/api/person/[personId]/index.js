import { get } from '../../../../axiosServer';
import { apiMethodHandler } from '../../../../utils';

async function handleGet(req, res) {
    const { personId } = req.query;
    try {
        const response = await get(`person/${personId}`, {
            append_to_response: 'combined_credits,images,external_ids'
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ GET: handleGet });
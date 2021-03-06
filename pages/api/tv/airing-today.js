import { get } from '../../../axiosServer';
import { apiMethodHandler } from '../../../utils';

async function handleGet(req, res) {

    const page = req.query.page || 1;

    try {
        const response = await get('tv/airing_today', { page });
        res.json(response.data.results);
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ GET: handleGet });

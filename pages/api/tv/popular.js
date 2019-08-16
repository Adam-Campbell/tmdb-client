import { get } from '../../../axiosServer';
import { apiMethodHandler } from '../../../utils';

async function handleGet(req, res) {

    const page = req.query.page || 1;

    try {
        const response = await get('tv/popular', { page });
        res.status(200).json(response.data.results);
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ GET: handleGet });

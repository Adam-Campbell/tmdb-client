import { get } from '../../../../axiosServer';
import { apiMethodHandler } from '../../../../utils';

async function handleGet(req, res) {
    const { searchCategory, query } = req.query;
    try {
        const response = await get(`search/${searchCategory}`, { query });
        res.json(response.data.results);
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ GET: handleGet });

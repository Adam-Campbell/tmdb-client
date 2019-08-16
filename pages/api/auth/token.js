import { get } from '../../../axiosServer';
import { apiMethodHandler } from '../../../utils';

async function handleGet(req, res) {
    try {
        const response = await get('authentication/token/new');
        res.json({ request_token: response.data.request_token });
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ GET: handleGet });
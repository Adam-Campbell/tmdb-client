import { get } from '../../../../axiosServer';

export default async function handler(req, res) {
    const { userId } = req.query;
    const { userSessionId } = req.cookies;
    if (!userSessionId) {
        res.status(401).end();
        return;
    }
    try {
        const response = await get(`account/${userId}/lists`, { session_id: userSessionId });
        res.json(response.data.results)
    } catch (error) {
        console.log(error)
    }
}

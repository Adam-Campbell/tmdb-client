import { get } from '../../../axiosServer';
import { apiMethodHandler } from '../../../utils';

async function handleGet(req, res) {
    const {
        release_gte,
        release_lte,
        score_gte,
        score_lte,
        sort_by,
        with_genres,
        media_type
    } = req.query;

    const isMovies = media_type === 'movies';
    const discoverUrl =  isMovies ? 'discover/movie' : 'discover/tv';
    const releaseDateString = isMovies ? 'primary_release_date' : 'first_air_date';

    const paramsObject = {
        [`${releaseDateString}.gte`]: `${release_gte}-01-01`,
        [`${releaseDateString}.lte`]: `${release_lte}-12-31`,
        'vote_average.gte': score_gte,
        'vote_average.lte': score_lte,
        with_genres: with_genres.replace('%2C', ','),
        sort_by: sort_by.replace(/release_date/g, releaseDateString)
    };

    try {
        const response = await get(discoverUrl, paramsObject);
        res.json(response.data.results);
    } catch (error) {
        console.log(error);
    }

}

export default apiMethodHandler({ GET: handleGet });
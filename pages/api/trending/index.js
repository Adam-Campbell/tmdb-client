import { get } from '../../../axiosServer';
import { apiMethodHandler } from '../../../utils';

function formatTrendingEntity(entity) {
    // entity is a movie
    if (entity.hasOwnProperty('title')) {
        return {
            id: entity.id,
            value: entity.title,
            entityType: 'movie'
        };
        // entity is a tv show
    } else if (entity.hasOwnProperty('original_name')) {
        return {
            id: entity.id,
            value: entity.name,
            entityType: 'tv'
        }
        // entity is a person
    } else {
        return {
            id: entity.id,
            value: entity.name,
            entityType: 'person'
        };
    }
}

async function handleGet(req, res) {
    try {
        const response = await get('trending/all/day');
        const formattedResponse = response.data.results.slice(0,10).map(formatTrendingEntity);
        res.json(formattedResponse);
    } catch (error) {
        console.log(error);
    }
}

export default apiMethodHandler({ GET: handleGet });

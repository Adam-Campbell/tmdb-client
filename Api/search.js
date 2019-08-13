import { get } from './helpers';

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

export const getTrendingSearches = async () => {
    const response = await get('trending/all/day');
    return response.data.results.slice(0, 10).map(formatTrendingEntity);
};

// export const getSearchResults = async (searchQuery, searchCategory = 'movie') => {
//     const response = await get(`search/${searchCategory}`, {
//         query: searchQuery
//     });
//     return response.data.results;
// };

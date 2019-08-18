const movieSubroutes = [
    { 
        name: 'Similar',
        path: 'similar'
    },
    {
        name: 'Recommended',
        path: 'recommended'
    },
    {
        name: 'Reviews',
        path: 'reviews'
    },
    {
        name: 'Cast & Crew',
        path: 'cast-and-crew'
    },
    {
        name: 'Images',
        path: 'images'
    }
];

const showSubroutes = [
    { 
        name: 'Similar',
        path: 'similar'
    },
    {
        name: 'Recommended',
        path: 'recommended'
    },
    {
        name: 'Reviews',
        path: 'reviews'
    },
    {
        name: 'Cast & Crew',
        path: 'cast-and-crew'
    },
    {
        name: 'Images',
        path: 'images'
    },
    {
        name: 'Seasons',
        path: 'seasons'
    }
];

const personSubroutes = [
    {
        name: 'Credits',
        path: 'credits'
    },
    {
        name: 'Images',
        path: 'images'
    }
];

function getSubNavData(routeGroup, subrouteData) {
    return function mapData(id) {
        return subrouteData.map(subroute => ({
            name: subroute.name,
            href: `/${routeGroup}/[id]/${subroute.path}`,
            as: `/${routeGroup}/${id}/${subroute.path}`
        }));
    }
}

export const getMovieSubNavData = getSubNavData('movie', movieSubroutes);
export const getShowSubNavData = getSubNavData('show', showSubroutes);
export const getPersonSubNavData = getSubNavData('person', personSubroutes);

export function getSearchSubNavData(searchQuery) {
    const names = {
        movie: 'Movies',
        tv: 'TV Shows',
        person: 'People'
    }
    return ['movie', 'tv', 'person'].map(category => ({
        name: names[category],
        href: `/search?category=${category}&query=${encodeURIComponent(searchQuery)}`,
        as: `/search?category=${category}&query=${encodeURIComponent(searchQuery)}`
    }));
}

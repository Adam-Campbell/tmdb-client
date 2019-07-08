const mediaSubroutes = [
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
            href: `/${routeGroup}/${subroute.path}?id=${id}`,
            as: `/${routeGroup}/${id}/${subroute.path}`
        }));
    }
}

export const getMovieSubNavData = getSubNavData('movie', mediaSubroutes);
export const getShowSubNavData = getSubNavData('show', mediaSubroutes);
export const getPersonSubNavData = getSubNavData('person', personSubroutes);

export function getSearchSubNavData(searchQuery) {
    return ['Movie', 'TV', 'Person'].map(category => ({
        name: category,
        href: `/search?category=${category.toLowerCase()}&query=${searchQuery}`,
        as: `/search?category=${category.toLowerCase()}&query=${searchQuery}`
    }));
}

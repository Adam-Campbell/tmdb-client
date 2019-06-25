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

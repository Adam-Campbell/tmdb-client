import React from 'react';
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies
} from '../../../clientApi';
import ExploreMediaPage from '../../../components/ExploreMediaPage';

function getSubcategoryProps(subcategory) {
    let props;
    switch (subcategory) {
        case 'popular':
            props = {
                dataFetchingFn: getPopularMovies,
                title: 'Popular Movies' 
            };
            break;
        case 'top-rated':
            props = {
                dataFetchingFn: getTopRatedMovies,
                title: 'Top Rated Movies'
            };
            break;
        case 'now-playing':
            props = {
                dataFetchingFn: getNowPlayingMovies,
                title: 'Now Playing Movies'
            };
            break;
        case 'upcoming':
            props = {
                dataFetchingFn: getUpcomingMovies,
                title: 'Upcoming Movies'
            };
            break;
        default:
            props = {
                dataFetchingFn: getPopularMovies,
                title: 'Popular Movies' 
            };
    }
    return {
        ...props, 
        pageLinkAs: `/movies/${subcategory}`,
        pageLinkHref: `/movies/[subcategory]`,
    };
}

function MoviesWithSubcategory({ 
    results, 
    title,
    pageLinkAs,
    pageLinkHref,
    currentPage 
}) {

    return (
        <ExploreMediaPage 
            title={title}
            mediaData={results}
            currentPage={currentPage}
            pageLinkAs={pageLinkAs}
            pageLinkHref={pageLinkHref}
        />
    );
}

MoviesWithSubcategory.getInitialProps = async ({ query }) => {
    const { subcategory } = query;
    const currentPage = parseInt(query.page) || 1;
    const {
        dataFetchingFn,
        title, 
        pageLinkAs,
        pageLinkHref
    } = getSubcategoryProps(subcategory);
    const results = await dataFetchingFn(currentPage);
    return {
        results,
        title,
        pageLinkAs,
        pageLinkHref,
        currentPage
    };
};

export default MoviesWithSubcategory;

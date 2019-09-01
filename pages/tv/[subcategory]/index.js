import React from 'react';
import {
    getPopularTV,
    getTopRatedTV,
    getOnAirTV,
    getAiringTodayTV,
} from '../../../clientApi';
import ExploreMediaPage from '../../../components/ExploreMediaPage';

function getSubcategoryProps(subcategory) {
    let props;
    switch (subcategory) {
        case 'popular':
            props = {
                dataFetchingFn: getPopularTV,
                title: 'Popular TV Shows' 
            };
            break;
        case 'top-rated':
            props = {
                dataFetchingFn: getTopRatedTV,
                title: 'Top Rated TV Shows'
            };
            break;
        case 'on-tv':
            props = {
                dataFetchingFn: getOnAirTV,
                title: 'TV Shows On Air'
            };
            break;
        case 'airing-today':
            props = {
                dataFetchingFn: getAiringTodayTV,
                title: 'TV Shows Airing Today'
            };
            break;
        default:
            props = {
                dataFetchingFn: getPopularTV,
                title: 'Popular TV Shows' 
            };
    }
    return {
        ...props, 
        pageLinkAs: `/tv/${subcategory}`,
        pageLinkHref: `/tv/[subcategory]`,
    };
}

function TVWithSubcategory({ 
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

TVWithSubcategory.getInitialProps = async ({ query }) => {
    const { subcategory } = query;
    const currentPage = parseInt(query.page || 1);
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

export default TVWithSubcategory;

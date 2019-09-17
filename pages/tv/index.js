import React from 'react';
import { getPopularTV } from '../../clientApi';
import ExploreMediaView from '../../components/ExploreMediaView';

function TVWithoutSubcategory({ results, currentPage }) {

    return (
        <ExploreMediaView 
            title="Popular TV Shows"
            mediaData={results}
            currentPage={currentPage}
            pageLinkAs="/tv"
            pageLinkHref="/tv"
        />
    );
}

TVWithoutSubcategory.getInitialProps = async ({ query }) => {
    const subcategory = 'popular';
    const currentPage = parseInt(query.page) || 1;
    const results = await getPopularTV(currentPage);
    return {
        results,
        currentPage
    };
};

export default TVWithoutSubcategory;

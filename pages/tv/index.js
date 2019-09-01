import React from 'react';
import ExploreMediaPage from '../../components/ExploreMediaPage';
import { getPopularTV } from '../../clientApi';

function TVWithoutSubcategory({ results, currentPage }) {

    return (
        <ExploreMediaPage 
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

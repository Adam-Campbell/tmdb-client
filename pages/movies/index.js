import React from 'react';
import { getPopularMovies } from '../../clientApi';
import ExploreMediaPage from '../../components/ExploreMediaPage';
 
function MoviesWithoutSubcategory({ results, currentPage }) {

    return (
        <ExploreMediaPage 
            title="Popular Movies"
            mediaData={results}
            currentPage={currentPage}
            pageLinkAs="/movies"
            pageLinkHref="/movies"
        />
    );
}

MoviesWithoutSubcategory.getInitialProps = async ({ query }) => {
    const subcategory = 'popular';
    const currentPage = parseInt(query.page) || 1;
    const results = await getPopularMovies(currentPage);
    return {
        results,
        currentPage
    };
};

export default MoviesWithoutSubcategory;
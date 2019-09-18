import React from 'react';
import { getPopularMovies } from '../../clientApi';
import ExploreMediaView from '../../components/ExploreMediaView';
 
function MoviesWithoutSubcategory({ results, currentPage }) {

    return (
        <ExploreMediaView 
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
import React from 'react';
import { getPopularMovies } from '../../Api';
import ExploreMediaPage from '../../components/ExploreMediaPage';

function MoviesWithoutSubcategory({ results, subcategory }) {

    return (
        <ExploreMediaPage 
            title="Popular Movies"
            initialData={results}
            getDataFn={getPopularMovies}
            subcategory={subcategory}
        />
    );
}

MoviesWithoutSubcategory.getInitialProps = async ({ query }) => {
    const subcategory = 'popular';
    const [ page1, page2 ] = await Promise.all([
        getPopularMovies(),
        getPopularMovies(2),
    ]);
    return {
        results: [ ...page1, ...page2 ],
        subcategory
    };
};

export default MoviesWithoutSubcategory;
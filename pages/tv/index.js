import React from 'react';
import { getPopularTV } from '../../Api';
import ExploreMediaPage from '../../components/ExploreMediaPage';

function TVWithoutSubcategory({ results, subcategory }) {

    return (
        <ExploreMediaPage 
            title="Popular TV Shows"
            initialData={results}
            getDataFn={getPopularTV}
            subcategory={subcategory}
        />
    );
}

TVWithoutSubcategory.getInitialProps = async ({ query }) => {
    const subcategory = 'popular';
    const [ page1, page2 ] = await Promise.all([
        getPopularTV(),
        getPopularTV(2),
    ]);
    return {
        results: [ ...page1, ...page2 ],
        subcategory
    };
};

export default TVWithoutSubcategory;
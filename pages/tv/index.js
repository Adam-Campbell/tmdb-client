import React from 'react';
import ExploreMediaPage from '../../components/ExploreMediaPage';
import { getPopularTV } from '../../clientApi';

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
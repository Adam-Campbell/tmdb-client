import React from 'react';
import { getShowDetails } from '../Api';
import MediaHeader from '../components/MediaHeader';

function Show({ results }) {
    return (
        <div>
            <MediaHeader 
                backdropPath={results.backdrop_path}
                posterPath={results.poster_path}
                id={results.id}
                title={results.name}
                averageRating={results.vote_average}
                overview={results.overview}
                createdBy={results.created_by}
            />
        </div>
    );
}

Show.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getShowDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default Show;

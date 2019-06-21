import React from 'react';
import { getMovieDetails } from '../Api';
import MediaHeader from '../components/MediaHeader';

function Movie({ results }) {
    
    return (
        <div>
            <MediaHeader 
                backdropPath={results.backdrop_path}
                posterPath={results.poster_path}
                id={results.id}
                title={results.title}
                averageRating={results.vote_average}
                overview={results.overview}
                tagline={results.tagline}
            />
        </div>
    );
}

Movie.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getMovieDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default Movie;
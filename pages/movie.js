import React from 'react';
import { getMovieDetails } from '../Api';

function Movie(props) {
    return (
        <div>
            <h1>This is the movie details page!</h1>
        </div>
    );
}

Movie.getInitialProps = async ({ query }) => {
    const { id } = query;
    const results = await getMovieDetails(id);
    return {
        results
    };
};

export default Movie;
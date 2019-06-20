import React from 'react';
import { getMovieDetails } from '../Api';

function Movie(props) {
    return (
        <div>
            <h1>This is the movie details page!</h1>
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
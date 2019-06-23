import React from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../../Api';

function Recommended({ results }) {
    return (
        <div>
            <h1>This is the page for recommended movies!</h1>
            <p>It is inside the movie subdirectory</p>
        </div>
    );
}

Recommended.getInitialProps = async ({ query }) => {
    const { id } = query;
    return {
        id
    };
}

export default Recommended;
import React from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../../Api';

function Similar({ results }) {
    return (
        <div>
            <h1>This is the page for similar movies!</h1>
        </div>
    );
}

Similar.getInitialProps = async ({ query }) => {
    const { id } = query;
    return {
        id
    };
}

export default Similar;
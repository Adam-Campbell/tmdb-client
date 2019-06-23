import React from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../../Api';

function CastAndCrew({ results }) {
    return (
        <div>
            <h1>This is the page for cast and crew</h1>
        </div>
    );
}

CastAndCrew.getInitialProps = async ({ query }) => {
    const { id } = query;
    return {
        id
    };
}

export default CastAndCrew;
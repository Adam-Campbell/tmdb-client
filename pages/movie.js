import React from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../Api';
import MediaHeader from '../components/MediaHeader';
import { 
    MainCol, 
    SidebarCol, 
    TwoColLayoutContainer,
    TwoColLayoutRow
} from '../components/Layout';

const Heading = styled.h1`
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: #222;
`;

const SidebarHeading = styled.h2`
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    color: #222;
`;

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
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <Heading>This is the main content!</Heading>
                    </MainCol>
                    <SidebarCol>
                        <SidebarHeading>This is sidebar content!</SidebarHeading>
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
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
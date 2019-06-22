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
import InlineCardRow from '../components/InlineCardRow';

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
                        <InlineCardRow 
                            title="Top Billed Cast"
                            cardsData={results.credits.cast}
                            cardType="person"
                            linkText="See full cast & crew"
                            linkDestinationAs="/foo"
                            linkDestinationHref="/foo"
                        />
                        <InlineCardRow 
                            title="Recommended Movies"
                            cardsData={results.recommendations.results}
                            cardType="movie"
                            linkText="See all recommended movies"
                            linkDestinationAs="/foo"
                            linkDestinationHref="/foo"
                        />
                        <InlineCardRow 
                            title="Similar Movies"
                            cardsData={results.similar.results}
                            cardType="movie"
                            linkText="See all similar movies"
                            linkDestinationAs="/foo"
                            linkDestinationHref="/foo"
                        />
                    </MainCol>
                    <SidebarCol>

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
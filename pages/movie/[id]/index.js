import React, { useMemo } from 'react';
import styled from 'styled-components';
import MediaHeader from '../../../components/MediaHeader';
import { 
    MainCol, 
    SidebarCol, 
    TwoColLayoutContainer,
    TwoColLayoutRow
} from '../../../components/Layout';
import MediaInlineCardRow from '../../../components/MediaInlineCardRow';
import {  
    getMovieSubNavData,
    getSSRHeaders 
} from '../../../utils';
import ReviewPod from '../../../components/ReviewPod';
import SubNav from '../../../components/SubNav';
import { fetchMovie } from '../../../actions';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import withErrorHandling from '../../../components/withErrorHandling';
import MovieSidebar from '../../../components/MovieSidebar';
import { MediaSeo } from '../../../components/Seo';

export async function getInitialMovieProps({ query, req, store }) {
    try {
        const id = parseInt(query.id);
        await store.dispatch(fetchMovie(id, getSSRHeaders(req)));
        return {};
    } catch (error) {
        return {
            hasError: true,
            errorCode: error.message
        };
    }
}

function Movie({
    id,
    cast,
    reviews,
    recommendations,
    similar
}) {

    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id); 
    }, [ id ]);
    
    return (
        <>
            <MediaSeo isMovie={true} />
            <MediaHeader 
                key={id}
                isMovie={true}
            />
            <SubNav 
                navData={movieSubNavData}
                navLabel="Navigation links for pages related to the current movie"
            />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <MediaInlineCardRow 
                            title="Top Billed Cast"
                            cardsData={cast}
                            cardType="person"
                            linkText="See full cast & crew"
                            linkDestinationAs={`/movie/${id}/cast-and-crew`}
                            linkDestinationHref="/movie/[id]/cast-and-crew"
                        />
                        <ReviewPod 
                            reviews={reviews.results}
                            linkDestinationAs={`/movie/${id}/reviews`}
                            linkDestinationHref="/movie/[id]/reviews"
                        />
                        <MediaInlineCardRow 
                            title="Recommended Movies"
                            cardsData={recommendations}
                            cardType="movie"
                            linkText="See all recommended movies"
                            linkDestinationAs={`/movie/${id}/recommended`}
                            linkDestinationHref="/movie/[id]/recommended"
                        />
                        <MediaInlineCardRow 
                            title="Similar Movies"
                            cardsData={similar}
                            cardType="movie"
                            linkText="See all similar movies"
                            linkDestinationAs={`/movie/${id}/similar`}
                            linkDestinationHref="/movie/[id]/similar"
                        />
                    </MainCol>
                    <SidebarCol>
                        <MovieSidebar />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </>
    );
}

function mapState(state) {
    const m = getMovieData(state);
    return {
        id: m.id,
        cast: m.credits.cast,
        reviews: m.reviews,
        recommendations: m.recommendations.results,
        similar: m.similar.results,
    };
}



const MoviePage = withErrorHandling(
    connect(mapState)(Movie)
);

MoviePage.getInitialProps = getInitialMovieProps;

export default MoviePage;

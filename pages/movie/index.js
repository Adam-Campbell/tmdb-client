import React from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../../Api';
import MediaHeader from '../../components/MediaHeader';
import { 
    MainCol, 
    SidebarCol, 
    TwoColLayoutContainer,
    TwoColLayoutRow
} from '../../components/Layout';
import MediaInlineCardRow from '../../components/MediaInlineCardRow';
import TagList from '../../components/TagList';
import { 
    text, 
    formatDateString, 
    formatMinutes, 
    formatDollarFigure, 
    getMovieSubNavData 
} from '../../utils';
import SidebarEntry from '../../components/SidebarEntry';
import SocialLinks from '../../components/SocialLinks';
import ReviewPod from '../../components/ReviewPod';
import SubNav from '../../components/SubNav';



function Movie({ results }) {
    const movieSubNavData = getMovieSubNavData(results.id); 
    return (
        <div>
            <MediaHeader 
                key={results.id}
                backdropPath={results.backdrop_path}
                posterPath={results.poster_path}
                id={results.id}
                title={results.title}
                averageRating={results.vote_average}
                overview={results.overview}
                tagline={results.tagline}
            />
            <SubNav 
                navData={movieSubNavData}
            />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <MediaInlineCardRow 
                            title="Top Billed Cast"
                            cardsData={results.credits.cast}
                            cardType="person"
                            linkText="See full cast & crew"
                            linkDestinationAs={`/movie/${results.id}/cast-and-crew`}
                            linkDestinationHref={`/movie/cast-and-crew?id=${results.id}`}
                        />
                        {results.reviews.results.length > 0 && (
                            <ReviewPod 
                                author={results.reviews.results[0].author}
                                content={results.reviews.results[0].content}
                                id={results.reviews.results[0].id}
                                allReviewsHref="/foo"
                                allReviewsAs="/foo"
                            />
                        )}
                        <MediaInlineCardRow 
                            title="Recommended Movies"
                            cardsData={results.recommendations.results}
                            cardType="movie"
                            linkText="See all recommended movies"
                            linkDestinationAs={`/movie/${results.id}/recommended`}
                            linkDestinationHref={`/movie/recommended?id=${results.id}`}
                        />
                        <MediaInlineCardRow 
                            title="Similar Movies"
                            cardsData={results.similar.results}
                            cardType="movie"
                            linkText="See all similar movies"
                            linkDestinationAs={`/movie/${results.id}/similar`}
                            linkDestinationHref={`/movie/similar?id=${results.id}`}
                        />
                    </MainCol>
                    <SidebarCol>
                        <SocialLinks 
                            facebook={results.external_ids.facebook_id}
                            twitter={results.external_ids.twitter_id}
                            instagram={results.external_ids.instagram_id}
                            website={results.homepage}
                        />
                        <SidebarEntry 
                            title="Release status"
                            value={results.status}
                        />
                        <SidebarEntry 
                            title="Release date"
                            value={formatDateString(results.release_date)}
                        />
                        <SidebarEntry 
                            title="Duration"
                            value={formatMinutes(results.runtime)}
                        />
                        <SidebarEntry 
                            title="Budget"
                            value={formatDollarFigure(results.budget)}
                        />
                        <SidebarEntry 
                            title="Revenue"
                            value={formatDollarFigure(results.revenue)}
                        />
                        <TagList title="Genres" tagData={results.genres} />
                        <TagList title="Keywords" tagData={results.keywords.keywords} />
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
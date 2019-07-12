import React from 'react';
import styled from 'styled-components';
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

import { fetchMovie } from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { getSessionType } from '../../reducers/sessionReducer';
import { connect } from 'react-redux';


function Movie(props) {
    const movieSubNavData = getMovieSubNavData(props.id); 
    return (
        <div>
            <MediaHeader 
                key={props.id}
                backdropPath={props.backdropPath}
                posterPath={props.posterPath}
                id={props.id}
                title={props.title}
                averageRating={props.averageRating}
                overview={props.overview}
                tagline={props.tagline}
                sessionType={props.sessionType}
                accountStates={props.accountStates}
                mediaType="movie"
            />
            <SubNav 
                navData={movieSubNavData}
            />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <MediaInlineCardRow 
                            title="Top Billed Cast"
                            cardsData={props.cast}
                            cardType="person"
                            linkText="See full cast & crew"
                            linkDestinationAs={`/movie/${props.id}/cast-and-crew`}
                            linkDestinationHref={`/movie/cast-and-crew?id=${props.id}`}
                        />
                        {props.reviews.results.length > 0 && (
                            <ReviewPod 
                                author={props.reviews.results[0].author}
                                content={props.reviews.results[0].content}
                                id={props.reviews.results[0].id}
                                allReviewsHref="/foo"
                                allReviewsAs="/foo"
                            />
                        )}
                        <MediaInlineCardRow 
                            title="Recommended Movies"
                            cardsData={props.recommendations}
                            cardType="movie"
                            linkText="See all recommended movies"
                            linkDestinationAs={`/movie/${props.id}/recommended`}
                            linkDestinationHref={`/movie/recommended?id=${props.id}`}
                        />
                        <MediaInlineCardRow 
                            title="Similar Movies"
                            cardsData={props.similar}
                            cardType="movie"
                            linkText="See all similar movies"
                            linkDestinationAs={`/movie/${props.id}/similar`}
                            linkDestinationHref={`/movie/similar?id=${props.id}`}
                        />
                    </MainCol>
                    <SidebarCol>
                        <SocialLinks 
                            facebook={props.externalIds.facebook_id}
                            twitter={props.externalIds.twitter_id}
                            instagram={props.externalIds.instagram_id}
                            website={props.website}
                        />
                        <SidebarEntry 
                            title="Release status"
                            value={props.relaseStatus}
                        />
                        <SidebarEntry 
                            title="Release date"
                            value={props.releaseDate}
                        />
                        <SidebarEntry 
                            title="Duration"
                            value={props.duration}
                        />
                        <SidebarEntry 
                            title="Budget"
                            value={props.budget}
                        />
                        <SidebarEntry 
                            title="Revenue"
                            value={props.revenue}
                        />
                        <TagList title="Genres" tagData={props.genres} />
                        <TagList title="Keywords" tagData={props.keywords} />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
    );
}

Movie.getInitialProps = async ({ query, req, store }) => {
    //const { id } = query;
    const id = parseInt(query.id);
    await store.dispatch(fetchMovie(id));
    return {};
};

function mapState(state) {
    const m = getMovieData(state);
    return {
        id: m.id,
        backdropPath: m.backdrop_path,
        posterPath: m.poster_path,
        title: m.title,
        averageRating: m.vote_average,
        overview: m.overview,
        tagline: m.tagline,
        cast: m.credits.cast,
        reviews: m.reviews,
        recommendations: m.recommendations.results,
        similar: m.similar.results,
        externalIds: m.external_ids,
        website: m.homepage,
        releaseStatus: m.status,
        releaseDate: formatDateString(m.release_date),
        duration: formatMinutes(m.runtime),
        budget: formatDollarFigure(m.budget),
        revenue: formatDollarFigure(m.revenue),
        genres: m.genres,
        keywords: m.keywords.keywords,
        accountStates: m.account_states,
        sessionType: getSessionType(state)
    };
}

export default connect(mapState)(Movie);

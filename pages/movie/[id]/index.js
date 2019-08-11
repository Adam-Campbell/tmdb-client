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
import TagList from '../../../components/TagList';
import { 
    text, 
    formatDateString, 
    formatMinutes, 
    formatDollarFigure, 
    getMovieSubNavData 
} from '../../../utils';
import SidebarEntry from '../../../components/SidebarEntry';
import SocialLinks from '../../../components/SocialLinks';
import ReviewPod from '../../../components/ReviewPod';
import SubNav from '../../../components/SubNav';

import { fetchMovie } from '../../../actions';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';


function Movie({
    id,
    cast,
    reviews,
    recommendations,
    similar,
    externalIds,
    website, 
    releaseStatus,
    releaseDate,
    duration,
    budget,
    revenue,
    genres,
    keywords
}) {
    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id); 
    }, [ id ]);
    
    return (
        <div>
            <MediaHeader 
                key={id}
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
                        <SocialLinks 
                            facebook={externalIds.facebook_id}
                            twitter={externalIds.twitter_id}
                            instagram={externalIds.instagram_id}
                            website={website}
                        />
                        <SidebarEntry 
                            title="Release status"
                            value={releaseStatus}
                        />
                        <SidebarEntry 
                            title="Release date"
                            value={releaseDate}
                        />
                        <SidebarEntry 
                            title="Duration"
                            value={duration}
                        />
                        <SidebarEntry 
                            title="Budget"
                            value={budget}
                        />
                        <SidebarEntry 
                            title="Revenue"
                            value={revenue}
                        />
                        <TagList title="Genres" tagData={genres} />
                        <TagList title="Keywords" tagData={keywords} />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
    );
}

Movie.getInitialProps = async ({ query, req, store }) => {
    const id = parseInt(query.id);
    await store.dispatch(fetchMovie(id));
    return {};
};

function mapState(state) {
    const m = getMovieData(state);
    return {
        id: m.id,
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
    };
}

export default connect(mapState)(Movie);

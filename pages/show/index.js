import React from 'react';
import { getShowDetails } from '../../Api';
import MediaHeader from '../../components/MediaHeader';
import { 
    MainCol, 
    SidebarCol, 
    TwoColLayoutContainer,
    TwoColLayoutRow
} from '../../components/Layout';
import { getShowSubNavData } from '../../utils';
import MediaInlineCardRow from '../../components/MediaInlineCardRow';
import SidebarEntry from '../../components/SidebarEntry';
import SocialLinks from '../../components/SocialLinks';
import ReviewPod from '../../components/ReviewPod';
import TagList from '../../components/TagList';
import SubNav from '../../components/SubNav';

import { fetchShow } from '../../actions';
import { getShowData } from '../../reducers/showReducer';
import { connect } from 'react-redux';
 
function Show({
    id, 
    cast,
    reviews,
    recommendations,
    similar,
    externalIds,
    website,
    status,
    type,
    numberOfSeasons,
    numberOfEpisodes,
    runtime,
    genres,
    keywords
}) {
    const showSubNavData = getShowSubNavData(id);
    return (
        <div>
            <MediaHeader 
                key={id}
                mediaType="tv"
            />
            <SubNav navData={showSubNavData} />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <MediaInlineCardRow 
                            title="Top Cast"
                            cardsData={cast}
                            cardType="person"
                            linkText="See full cast & crew"
                            linkDestinationAs={`/show/${id}/cast-and-crew`}
                            linkDestinationHref={`/show/cast-and-crew?id=${id}`}
                        />
                        {reviews.results.length > 0 && (
                            <ReviewPod 
                                author={reviews.results[0].author}
                                content={reviews.results[0].content}
                                id={reviews.results[0].id}
                                allReviewsHref="/foo"
                                allReviewsAs="/foo"
                            />
                        )}
                        <MediaInlineCardRow 
                            title="Recommended Shows"
                            cardsData={recommendations}
                            cardType="show"
                            linkText="See all recommended shows"
                            linkDestinationAs={`/show/${id}/recommended`}
                            linkDestinationHref={`/show/recommended?id=${id}`}
                        />
                        <MediaInlineCardRow 
                            title="Similar Shows"
                            cardsData={similar}
                            cardType="show"
                            linkText="See all similar shows"
                            linkDestinationAs={`/show/${id}/similar`}
                            linkDestinationHref={`/show/similar?id=${id}`}
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
                            title="Status"
                            value={status}
                        />
                        <SidebarEntry 
                            title="Type"
                            value={type}
                        />
                        <SidebarEntry 
                            title="Number of seasons"
                            value={numberOfSeasons}
                        />
                        <SidebarEntry 
                            title="Number of episodes"
                            value={numberOfEpisodes}
                        />
                        <SidebarEntry 
                            title="Runtime"
                            value={runtime}
                        />
                        <TagList title="Genres" tagData={genres} />
                        <TagList title="Keywords" tagData={keywords} />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
    );
}

Show.getInitialProps = async ({ query, req, store }) => {
    const id = parseInt(query.id);
    await store.dispatch(fetchShow(id));
    return {};
};

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        cast: s.credits.cast,
        reviews: s.reviews,
        recommendations: s.recommendations.results,
        similar: s.similar.results,
        externalIds: s.external_ids,
        website: s.homepage,
        status: s.status,
        type: s.type,
        numberOfSeasons: s.number_of_seasons,
        numberOfEpisodes: s.number_of_episodes,
        runtime: s.episode_run_time[0],
        genres: s.genres,
        keywords: s.keywords.results,
    };
}

export default connect(mapState)(Show);

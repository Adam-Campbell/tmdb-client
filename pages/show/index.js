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
import { getSessionType } from '../../reducers/sessionReducer';
import { connect } from 'react-redux';
 
function Show(props) {
    const showSubNavData = getShowSubNavData(props.id);
    return (
        <div>
            <MediaHeader 
                backdropPath={props.backdropPath}
                posterPath={props.posterPath}
                id={props.id}
                title={props.title}
                averageRating={props.averageRating}
                overview={props.overview}
                createdBy={props.createdBy}
                sessionType={props.sessionType}
                accountStates={props.accountStates}
                mediaType="tv"
            />
            <SubNav navData={showSubNavData} />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <MediaInlineCardRow 
                            title="Top Cast"
                            cardsData={props.cast}
                            cardType="person"
                            linkText="See full cast & crew"
                            linkDestinationAs={`/show/${props.id}/cast-and-crew`}
                            linkDestinationHref={`/show/cast-and-crew?id=${props.id}`}
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
                            title="Recommended Shows"
                            cardsData={props.recommendations}
                            cardType="show"
                            linkText="See all recommended shows"
                            linkDestinationAs={`/show/${props.id}/recommended`}
                            linkDestinationHref={`/show/recommended?id=${props.id}`}
                        />
                        <MediaInlineCardRow 
                            title="Similar Shows"
                            cardsData={props.similar}
                            cardType="show"
                            linkText="See all similar shows"
                            linkDestinationAs={`/show/${props.id}/similar`}
                            linkDestinationHref={`/show/similar?id=${props.id}`}
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
                            title="Status"
                            value={props.status}
                        />
                        <SidebarEntry 
                            title="Type"
                            value={props.type}
                        />
                        <SidebarEntry 
                            title="Number of seasons"
                            value={props.numberOfSeasons}
                        />
                        <SidebarEntry 
                            title="Number of episodes"
                            value={props.numberOfEpisodes}
                        />
                        <SidebarEntry 
                            title="Runtime"
                            value={props.runtime}
                        />
                        <TagList title="Genres" tagData={props.genres} />
                        <TagList title="Keywords" tagData={props.keywords} />
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
        title: s.name,
        backdropPath: s.backdrop_path,
        posterPath: s.poster_path,
        averageRating: s.vote_average,
        overview: s.overview,
        createdBy: s.created_by,
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
        accountStates: s.account_states,
        sessionType: getSessionType(state)
    };
}

export default connect(mapState)(Show);

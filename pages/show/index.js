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

function Show({ results }) {
    const showSubNavData = getShowSubNavData(results.id);
    return (
        <div>
            <MediaHeader 
                backdropPath={results.backdrop_path}
                posterPath={results.poster_path}
                id={results.id}
                title={results.name}
                averageRating={results.vote_average}
                overview={results.overview}
                createdBy={results.created_by}
            />
            <SubNav navData={showSubNavData} />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <MediaInlineCardRow 
                            title="Top Cast"
                            cardsData={results.credits.cast}
                            cardType="person"
                            linkText="See full cast & crew"
                            linkDestinationAs={`/show/${results.id}/cast-and-crew`}
                            linkDestinationHref={`/show/cast-and-crew?id=${results.id}`}
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
                            title="Recommended Shows"
                            cardsData={results.recommendations.results}
                            cardType="show"
                            linkText="See all recommended shows"
                            linkDestinationAs={`/show/${results.id}/recommended`}
                            linkDestinationHref={`/show/recommended?id=${results.id}`}
                        />
                        <MediaInlineCardRow 
                            title="Similar Shows"
                            cardsData={results.similar.results}
                            cardType="show"
                            linkText="See all similar shows"
                            linkDestinationAs={`/show/${results.id}/similar`}
                            linkDestinationHref={`/show/similar?id=${results.id}`}
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
                            title="Status"
                            value={results.status}
                        />
                        <SidebarEntry 
                            title="Type"
                            value={results.type}
                        />
                        <SidebarEntry 
                            title="Number of seasons"
                            value={results.number_of_seasons}
                        />
                        <SidebarEntry 
                            title="Number of episodes"
                            value={results.number_of_episodes}
                        />
                        <SidebarEntry 
                            title="Runtime"
                            value={results.episode_run_time[0]}
                        />
                        <TagList title="Genres" tagData={results.genres} />
                        <TagList title="Keywords" tagData={results.keywords.results} />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
    );
}

Show.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getShowDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default Show;

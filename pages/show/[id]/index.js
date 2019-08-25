import React, { useMemo } from 'react';
import MediaHeader from '../../../components/MediaHeader';
import { 
    MainCol, 
    SidebarCol, 
    TwoColLayoutContainer,
    TwoColLayoutRow
} from '../../../components/Layout';
import { getShowSubNavData, getSSRHeaders } from '../../../utils';
import MediaInlineCardRow from '../../../components/MediaInlineCardRow';
import ReviewPod from '../../../components/ReviewPod';
import SubNav from '../../../components/SubNav';
import { SeasonCard } from '../../../components/Cards';
import InlineContentRow from '../../../components/InlineContentRow';
import { fetchShow } from '../../../actions';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import withErrorHandling from '../../../components/withErrorHandling';
import ShowSidebar from '../../../components/ShowSidebar';
import MediaSeo from '../../../components/MediaSeo';

export async function getInitialShowProps({ query, req, store }) {
    try {
    const id = parseInt(query.id);
    await store.dispatch(fetchShow(id, getSSRHeaders(req)));
    return {};
    } catch (error) {
        return {
            hasError: true,
            errorCode: error.message
        };
    }
}
 
function Show({
    id, 
    cast,
    reviews,
    recommendations,
    similar,
    currentSeason
}) {

    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);
    
    return (
        <div>
            <MediaSeo />
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
                            linkDestinationHref="/show/[id]/cast-and-crew"
                        />
                        <InlineContentRow
                            title="Current Season"
                            linkText="View all seasons"
                            linkDestinationAs={`/show/${id}/seasons`}
                            linkDestinationHref="/show/[id]/seasons"
                        >
                            <SeasonCard 
                                name={currentSeason.name}
                                posterPath={currentSeason.poster_path}
                                airDate={currentSeason.air_date}
                                episodeCount={currentSeason.episode_count}
                                overview={currentSeason.overview}
                                showId={id}
                                seasonNumber={currentSeason.season_number}
                            />
                        </InlineContentRow>
                        <ReviewPod 
                            reviews={reviews.results}
                            linkDestinationAs={`/show/${id}/reviews`}
                            linkDestinationHref="/show/[id]/reviews"
                        />
                        <MediaInlineCardRow 
                            title="Recommended Shows"
                            cardsData={recommendations}
                            cardType="show"
                            linkText="See all recommended shows"
                            linkDestinationAs={`/show/${id}/recommended`}
                            linkDestinationHref="/show/[id]/recommended"
                        />
                        <MediaInlineCardRow 
                            title="Similar Shows"
                            cardsData={similar}
                            cardType="show"
                            linkText="See all similar shows"
                            linkDestinationAs={`/show/${id}/similar`}
                            linkDestinationHref="/show/[id]/similar"
                        />
                    </MainCol>
                    <SidebarCol>
                        <ShowSidebar />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
    );
}

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        cast: s.credits.cast,
        reviews: s.reviews,
        recommendations: s.recommendations.results,
        similar: s.similar.results,
        currentSeason: s.seasons[s.seasons.length-1]
    };
}

const ShowPage = withErrorHandling(
    connect(mapState)(Show)
);

ShowPage.getInitialProps = getInitialShowProps;

export default ShowPage;

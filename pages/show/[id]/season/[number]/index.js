import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MinimalHeader from '../../../../../components/MinimalHeader';
import SubNav from '../../../../../components/SubNav';
import { getShowSubNavData, text, getSSRHeaders } from '../../../../../utils';
import PeopleList from '../../../../../components/PeopleList';
import { Row } from '../../../../../components/Layout';
import EpisodePod from '../../../../../components/EpisodePod';
import { fetchSeason, fetchShow } from '../../../../../actions';
import { connect } from 'react-redux';
import { getSeasonData } from '../../../../../reducers/seasonReducer';
import { getShowData } from '../../../../../reducers/showReducer';
import { getHasSession } from '../../../../../reducers/sessionReducer';
import SeasonNavigation from '../../../../../components/SeasonNavigation';
import SeasonRatingsChart from '../../../../../components/SeasonRatingsChart';
import withErrorHandling from '../../../../../components/withErrorHandling';
import { MediaSeo } from '../../../../../components/Seo';

function Season({
    accountStates,
    airDate,
    credits,
    episodes,
    seasonId,
    images,
    name,
    overview,
    posterPath,
    backdropPath,
    seasonNumber,
    showId,
    allSeasons,
    hasSession
}) {
    
    const showSubNavData = useMemo(() => {
        return getShowSubNavData(showId);
    }, [ showId ]);

    return (
        <div>
            <MediaSeo 
                uniqueTitleSegment={seasonNumber > 0 ? `Season ${seasonNumber}` : 'Specials'}
            />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={name}
                backHref="/show/[id]/seasons"
                backAs={`/show/${showId}/seasons`}
                backText="Back to season list"
            />
            <SubNav navData={showSubNavData} alignLeft={true} />
            <SeasonNavigation 
                currentSeasonNumber={seasonNumber}
                allSeasons={allSeasons}
                showId={showId}
            />
            <Row>
                <PeopleList 
                    title="Cast"
                    people={credits.cast}
                    shouldAllowExpansion={true}
                />
                <PeopleList 
                    title="Crew"
                    people={credits.crew}
                    shouldAllowExpansion={true}
                />
                {episodes.map((episode, idx) => (
                    <EpisodePod 
                        key={episode.id}
                        airDate={episode.air_date}
                        episodeNumber={episode.episode_number}
                        guestStars={episode.guest_stars}
                        id={episode.id}
                        name={episode.name || ''}
                        overview={episode.overview || ''}
                        seasonNumber={episode.season_number}
                        showId={episode.show_id}
                        stillPath={episode.still_path || ''}
                        averageRating={episode.vote_average}
                        userRating={accountStates ? accountStates.results[idx].rated : false}
                        hasSession={hasSession}
                    />
                ))}
            </Row>
        </div>
    );
}

function mapState(state) {
    const s = getSeasonData(state);
    const show = getShowData(state);
    return {
        accountStates: s.account_states,
        airDate: s.air_date,
        credits: s.credits,
        episodes: s.episodes,
        seasonId: s.id,
        images: s.images,
        name: s.name || '',
        overview: s.overview || '',
        posterPath: s.poster_path || '',
        backdropPath: show.backdrop_path,
        seasonNumber: s.season_number,
        allSeasons: show.seasons,
        hasSession: getHasSession(state)
    }
}

const SeasonPage = withErrorHandling(
    connect(mapState)(Season)
);

SeasonPage.getInitialProps = async ({ req, query, store }) => {
    try {
    const showId = parseInt(query.id);
    const seasonNumber = parseInt(query.number);
    await Promise.all([
        store.dispatch(fetchShow(showId, getSSRHeaders(req))),
        store.dispatch(fetchSeason(showId, seasonNumber, getSSRHeaders(req)))
    ]);
    return {
        showId
    };
    } catch (error) {
        return {
            hasError: true,
            errorCode: error.message
        };
    }
}

export default SeasonPage;

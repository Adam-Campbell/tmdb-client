import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getSeasonDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData, text } from '../../utils';
import PeopleList from '../../components/PeopleList';
import { Row } from '../../components/Layout';
import EpisodePod from '../../components/EpisodePod';
import { fetchSeason, fetchShow } from '../../actions';
import { connect } from 'react-redux';
import { getSeasonData } from '../../reducers/seasonReducer';
import { getShowData } from '../../reducers/showReducer';
import { getSessionType } from '../../reducers/sessionReducer';
import SeasonNavigation from '../../components/SeasonNavigation';
import SeasonRatingsChart from '../../components/SeasonRatingsChart';

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
    seasonNumber,
    showId,
    allSeasons,
    sessionType
}) {
    
    const showSubNavData = useMemo(() => {
        return getShowSubNavData(showId);
    }, [ showId ]);
    
    const orderedCast = useMemo(() => {
        return credits.cast.sort((a,b) => a.order - b.order);
    }, [ credits.cast ]);

    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={name}
                backHref={`/show/seasons?id=${showId}`}
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
                    people={orderedCast}
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
                        sessionType={sessionType}
                    />
                ))}
            </Row>
        </div>
    );
}

Season.getInitialProps = async ({ query, store }) => {
    const showId = parseInt(query.id);
    const seasonNumber = parseInt(query.number);
    await Promise.all([
        store.dispatch(fetchShow(showId)),
        store.dispatch(fetchSeason(showId, seasonNumber))
    ]);
    return {
        showId
    };
}

function mapState(state) {
    const s = getSeasonData(state);
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
        seasonNumber: s.season_number,
        allSeasons: getShowData(state).seasons,
        sessionType: getSessionType(state)
    }
}

export default connect(mapState)(Season)
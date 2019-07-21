import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getSeasonDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData } from '../../utils';
import PeopleList from '../../components/PeopleList';
import { Row } from '../../components/Layout';
import EpisodePod from '../../components/EpisodePod';

export default function Season({
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
    showId
}) {

    const showSubNavData = getShowSubNavData(showId);
    
    const orderedCast = credits.cast.sort((a,b) => a.order - b.order);

    const ep = episodes[0];

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
            <Row>
                {/* <PeopleList 
                    title="Cast"
                    people={orderedCast}
                />
                <PeopleList 
                    title="Crew"
                    people={credits.crew}
                /> */}
                <EpisodePod 
                    airDate={ep.air_date}
                    episodeNumber={ep.episode_number}
                    guestStars={ep.guest_stars}
                    id={ep.id}
                    name={ep.name}
                    overview={ep.overview}
                    seasonNumber={ep.season_number}
                    showId={ep.show_id}
                    stillPath={ep.still_path}
                    averageRating={ep.vote_average}
                />
            </Row>
        </div>
    );
}

Season.getInitialProps = async ({ query, store }) => {
    const { id, number } = query;
    const sessionId = store.getState().session.userSessionId;
    const seasonDetails = await getSeasonDetails(id, number, sessionId);
    return {
        accountStates: seasonDetails.account_states,
        airDate: seasonDetails.air_date,
        credits: seasonDetails.credits,
        episodes: seasonDetails.episodes,
        seasonId: seasonDetails.id,
        images: seasonDetails.images,
        name: seasonDetails.name,
        overview: seasonDetails.overview,
        posterPath: seasonDetails.poster_path,
        seasonNumber: seasonDetails.season_number,
        showId: id
    };
}
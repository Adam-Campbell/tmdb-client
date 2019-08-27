import React from 'react';
import PropTypes from 'prop-types';
import { getShowData } from '../../reducers/showReducer';
import SidebarEntry from '../SidebarEntry';
import SocialLinks from '../SocialLinks';
import TagList from '../TagList';
import { connect } from 'react-redux';

export function ShowSidebar({
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
    return (
        <section>
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
        </section>
    );
}

function mapState(state) {
    const s = getShowData(state); 
    return {
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

export const ConnectedShowSidebar = connect(mapState)(ShowSidebar);

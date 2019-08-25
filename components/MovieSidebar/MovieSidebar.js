import React from 'react';
import SidebarEntry from '../SidebarEntry';
import SocialLinks from '../SocialLinks';
import TagList from '../TagList';
import { connect } from 'react-redux';
import { getMovieData } from '../../reducers/movieReducer';
import { formatDateString, formatMinutes, formatDollarFigure } from '../../utils';

export function MovieSidebar({
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
    return (
        <>
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
        </>
    )
}

function mapState(state) {
    const m = getMovieData(state);
    return {
        externalIds: m.external_ids,
        website: m.homepage,
        releaseStatus: m.status,
        releaseDate: formatDateString(m.release_date),
        duration: formatMinutes(m.runtime),
        budget: formatDollarFigure(m.budget),
        revenue: formatDollarFigure(m.revenue),
        genres: m.genres,
        keywords: m.keywords.keywords,
    }
}

export const ConnectedMovieSidebar = connect(mapState)(MovieSidebar);
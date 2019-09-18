import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
    StyledSeasonNavigation,
    SeasonNavigationRow,
    SeasonNavigationLink,
    BackArrow,
    ForwardArrow
} from './styledElements';

export function SeasonNavigation({ currentSeasonNumber, allSeasons, showId }) {

    const prevSeason = allSeasons[currentSeasonNumber - 1];
    const nextSeason = allSeasons[currentSeasonNumber + 1];

    return (
        <StyledSeasonNavigation>
            <SeasonNavigationRow>
                {prevSeason && (
                    <Link
                        href="/show/[id]/season/[number]"
                        as={`/show/${showId}/season/${prevSeason.season_number}`}
                        passHref
                    >
                        <SeasonNavigationLink>
                            <BackArrow />
                            {prevSeason.name}
                        </SeasonNavigationLink>
                    </Link>
                )}
                {nextSeason && (
                    <Link
                        href="/show/[id]/season/[number]"
                        as={`/show/${showId}/season/${nextSeason.season_number}`}
                        passHref
                    >
                        <SeasonNavigationLink alignRight>
                            {nextSeason.name}
                            <ForwardArrow />
                        </SeasonNavigationLink>
                    </Link>
                )}
            </SeasonNavigationRow>
        </StyledSeasonNavigation>
    );
}

SeasonNavigation.propTypes = {
    allSeasons: PropTypes.arrayOf(PropTypes.shape({
        air_date: PropTypes.string,
        episode_count: PropTypes.number,
        id: PropTypes.number,
        name: PropTypes.string,
        overview: PropTypes.string,
        poster_path: PropTypes.string,
        season_number: PropTypes.number
    })).isRequired,
    currentSeasonNumber: PropTypes.number.isRequired,
    showId: PropTypes.number.isRequired
};

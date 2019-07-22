import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ArrowAltCircleLeft, ArrowAltCircleRight } from 'styled-icons/fa-solid';
import Link from 'next/link';
import { text } from '../../utils';
import { Row } from '../Layout';

const StyledSeasonNavigation = styled.div`
    border-top: solid 2px #ddd;
    border-bottom: solid 2px #ddd; 
`;

const SeasonNavigationRow = styled(Row)`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const SeasonNavigationLink = styled.a`
    ${text('body', { fontWeight: 700 })}
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    margin-left: ${({ alignRight }) => alignRight ? 'auto' : 0};
    margin-right: ${({ alignRight }) => alignRight ? 0 : 'auto'};
    &:hover {
        text-decoration: underline;
    }
`;

const BackArrow = styled(ArrowAltCircleLeft)`
    color: #222;
    width: 20px;
    margin-right: 10px;
`;

const ForwardArrow = styled(ArrowAltCircleRight)`
    color: #222;
    width: 20px;
    margin-left: 10px;
`;

export function SeasonNavigation({ currentSeasonNumber, allSeasons, showId }) {

    const prevSeason = allSeasons[currentSeasonNumber - 1];
    const nextSeason = allSeasons[currentSeasonNumber + 1];

    return (
        <StyledSeasonNavigation>
            <SeasonNavigationRow>
                {prevSeason && (
                    <Link
                        href={`/show/season?id=${showId}&number=${prevSeason.season_number}`}
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
                        href={`/show/season?id=${showId}&number=${nextSeason.season_number}`}
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

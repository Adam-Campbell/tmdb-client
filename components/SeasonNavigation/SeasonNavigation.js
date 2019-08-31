import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ArrowAltCircleLeft, ArrowAltCircleRight } from 'styled-icons/fa-solid';
import Link from 'next/link';
import { text } from '../../utils';
import { Row } from '../Layout';

const StyledSeasonNavigation = styled.div`
    border-top: solid 2px ${({ theme }) => theme.colors.uiSecondary};
    border-bottom: solid 2px ${({ theme }) => theme.colors.uiSecondary};
`;

const SeasonNavigationRow = styled(Row)`
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.getSpacing(3, 0)};
`;

const SeasonNavigationLink = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
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
    color: ${({ theme }) => theme.colors.black};
    width: 20px;
    max-height: 25px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;

const ForwardArrow = styled(ArrowAltCircleRight)`
    color: ${({ theme }) => theme.colors.black};
    width: 20px;
    max-height: 25px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

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

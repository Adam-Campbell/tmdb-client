import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { imageSizeConstants, text, truncateString, formatDateString } from '../../utils';
import ImageLink from '../ImageLink';

const StyledSeasonCard = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    display: flex;
    align-items: center;
    @media(min-width: 550px) {
        align-items: flex-start;
    }
`;

const PosterImageLink = styled(ImageLink)`
    width: 100px;
    height: 150px;
    flex-shrink: 0;
    @media (min-width: 360px) {
        width: 130px;
        height: 210px
    }
    @media (min-width: 550px) {
        width: 185px;
        height: 277.5px;
    }
`;

const TextColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 100%;
`;

const TitleRow = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 550px) {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }
`;

const TitleLink = styled.a`
    margin: ${({ theme }) => theme.getSpacing(0, 2, 2, 0)};
    text-decoration: none;
    @media (min-width: 550px) {
        margin-bottom: 0;
    }
`;

const Title = styled.h3`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
    margin: 0;
    cursor: pointer;
    @media (min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.heading.md};
    }
`;

const SeasonInfo = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    margin: 4px 0 0 0;
`;

const SeasonOverview = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    margin: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    }
`;

export function getOverviewText(overview, airDate, name) {
    const hasNotAired = new Date(airDate) - Date.now() > 0;
    return hasNotAired
        ? `${name} will air on ${formatDateString(airDate)}.`
        : overview.length
            ? truncateString(overview, 280)
            : 'There is no overview for this season';
}

export function SeasonCard({ 
    name, 
    posterPath, 
    airDate, 
    episodeCount, 
    overview,
    showId,
    seasonNumber
}) {
    
    const year = useMemo(() => {
        return airDate.split('-')[0];
    }, [ airDate ]);

    const overviewText = useMemo(() => {
        return getOverviewText(overview, airDate, name);
    }, [ overview, airDate, name ]);

    return (
        <StyledSeasonCard>
            <PosterImageLink 
                imagePath={posterPath}
                imageSize={imageSizeConstants.w185}
                alt={name}
                linkHref="/show/[id]/season/[number]"
                linkAs={`/show/${showId}/season/${seasonNumber}`}
            />
            <TextColumn>
                <TitleRow>
                    <Link
                        href="/show/[id]/season/[number]" 
                        as={`/show/${showId}/season/${seasonNumber}`} 
                        passHref
                    >
                        <TitleLink>
                            <Title>{name}</Title>
                        </TitleLink>
                    </Link>
                    <SeasonInfo>{year} | {episodeCount} episodes</SeasonInfo>
                </TitleRow>
                <SeasonOverview>{overviewText}</SeasonOverview>
            </TextColumn>
        </StyledSeasonCard>
    );
}

SeasonCard.propTypes = {
    name: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    airDate: PropTypes.string.isRequired, 
    episodeCount: PropTypes.number.isRequired,
    overview: PropTypes.string,
    showId: PropTypes.number.isRequired,
    seasonNumber: PropTypes.number.isRequired
};

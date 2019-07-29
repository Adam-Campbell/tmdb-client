import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { imageSizeConstants, text, truncateString, formatDateString } from '../../utils';
import ImageLink from '../ImageLink';

const StyledSeasonCard = styled.div`
    width: 100%;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
`;

const TitleRow = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    @media (min-width: 550px) {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }
`;

const TitleLink = styled.a`
    margin-right: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    @media (min-width: 550px) {
        margin-bottom: 0;
    }
`;

const Title = styled.h2`
    ${text('heading', { fontSize: '1.25rem' })}
    margin-top: 0;
    margin-bottom: 0;
    cursor: pointer;
    @media (min-width: 550px) {
        font-size: 1.5rem;
    }
`;

const SeasonInfo = styled.p`
    ${text('body', { fontWeight: 700, fontSize: '0.85rem' })}
    margin-top: 0;
    margin-bottom: 0;
`;

const SeasonOverview = styled.p`
    ${text('body', { fontSize: '0.75rem' })}
    margin: 10px;
    @media (min-width: 550px) {
        font-size: 0.85rem;
    }
`;

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
        const hasNotAired = new Date(airDate) - Date.now() > 0;
        return hasNotAired
            ? `${name} will air on ${formatDateString(airDate)}.`
            : overview.length
                ? truncateString(overview, 280)
                : 'There is no overview for this season';
    }, [ airDate, name, overview ]);

    return (
        <StyledSeasonCard>
            <PosterImageLink 
                imagePath={posterPath}
                imageSize={imageSizeConstants.w185}
                alt={name}
                linkHref={`/show/season?id=${showId}&number=${seasonNumber}`}
                linkAs={`/show/${showId}/season/${seasonNumber}`}
            />
            <TextColumn>
                <TitleRow>
                    <Link
                        href={`/show/season?id=${showId}&number=${seasonNumber}`} 
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

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { getImageUrl, imageSizeConstants, text, truncateString } from '../../utils';

const StyledSeasonCard = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    @media(min-width: 550px) {
        align-items: flex-start;
    }
`;

const PosterImageLink = styled.a`
    position: relative;
    display: flex;
`;

const PosterImage = styled.img`
    width: 100px;
    height: 150.3px;
    @media(min-width: 360px) {
        width: 130px;
        height: 195.4px;
    }
    @media(min-width: 550px) {
        width: 185px;
        height: 278px;
    }
`;

const PosterImageOverlay = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition: background ease-out 0.2s;
    cursor: pointer;
    &:hover {
        background: rgba(17,17,17,0.4)
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
    const posterSrc = getImageUrl(posterPath, imageSizeConstants.w185);
    const year = airDate.split('-')[0];
    const truncatedOverview = truncateString(overview, 280);
    return (
        <StyledSeasonCard>
            <Link 
                href={`/show/season?id=${showId}&number=${seasonNumber}`} 
                as={`show/${showId}/season/${seasonNumber}`} 
                passHref
            >
                <PosterImageLink>
                    <PosterImage src={posterSrc} alt="" />
                    <PosterImageOverlay />
                </PosterImageLink>
            </Link>
            <TextColumn>
                <TitleRow>
                    <Link
                        href={`/show/season?id=${showId}&number=${seasonNumber}`} 
                        as={`show/${showId}/season/${seasonNumber}`} 
                        passHref
                    >
                        <TitleLink>
                            <Title>{name}</Title>
                        </TitleLink>
                    </Link>
                    <SeasonInfo>{year} | {episodeCount} episodes</SeasonInfo>
                </TitleRow>
                <SeasonOverview>{truncatedOverview}</SeasonOverview>
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
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import CardInfoRow from './CardInfoRow';

const StyledMediaCard = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    @media (min-width: 600px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

const ImageLink = styled.a`
    position: relative;
    display: flex;
`;

const PosterImage = styled.img`
    display: none;
    object-fit: cover;
    object-position: center;
    @media (min-width: 600px) {
        display: block;
        width: 185px;
        height: 278px;
    }
    ${({ isInline }) => isInline || `
        @media (min-width: 900px) {
            width: 220px;
            height: 331px;
        }
    `}
`;

const BackdropImage = styled.img`
    width: 100%;
    height: auto;
    @media (min-width: 600px) {
        display: none;
    }
`;

const ImageOverlay = styled.div`
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

const OverviewText = styled.p`
    ${text('body', { fontSize: '0.85rem' })}
    margin-left: 10px;
    margin-right: 10px;
    @media (min-width: 600px) {
        font-size: 0.75rem;
    }
    @media (min-width: 768px) {
        font-size: 0.85rem;
    }
    ${({ isInline }) => isInline || `
        @media (min-width: 900px) {
            font-size: 1rem;
        }
    `}
`;

const MoreInfoRow = styled.div`
    display: block;
    border-top: solid 1px #ddd;
    padding: 10px;
    margin-top: auto;
    @media(min-width: 600px) {
        display: block;
    }
`;

const MoreInfoLink = styled.a`
    ${text('body', { fontSize: '0.85rem' })}
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export function MediaCard({
    id,
    title,
    releaseDate,
    averageRating,
    posterPath,
    backdropPath, 
    overview,
    urlSubpath,
    isInline
}) {

    const posterSrc = getImageUrl(posterPath, imageSizeConstants.w300);
    const backdropSrc = getImageUrl(backdropPath, imageSizeConstants.w780);

    return (
        <StyledMediaCard>
            <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                <ImageLink>
                    <PosterImage src={posterSrc} alt="" isInline={isInline} />
                    <BackdropImage src={backdropSrc} alt="" />
                    <ImageOverlay />
                </ImageLink>
            </Link>
            <TextColumn>
                <CardInfoRow 
                    title={title}
                    releaseDate={releaseDate}
                    rating={averageRating}
                    id={id}
                    urlSubpath={urlSubpath}
                    isInline={isInline}
                />
                <OverviewText isInline={isInline}>
                    {overview || 'There is no description for this media'}
                </OverviewText>
                <MoreInfoRow>
                    <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                        <MoreInfoLink>More Info</MoreInfoLink>
                    </Link>
                </MoreInfoRow>
            </TextColumn>  
        </StyledMediaCard>
    );
}

MediaCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    averageRating: PropTypes.number,
    posterPath: PropTypes.string,
    backdropPath: PropTypes.string,
    overview: PropTypes.string.isRequired,
    urlSubpath: PropTypes.string,
    isInline: PropTypes.bool
};
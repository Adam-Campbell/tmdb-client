import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import CardInfoRow from './CardInfoRow';
import useHover from '../useHover';
import { useInView } from 'react-intersection-observer';
import {  Tv } from 'styled-icons/material';

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
    width: 100%;
    padding-bottom: 56.25%;
    flex-shrink: 0;
    @media (min-width: 600px) {
        padding-bottom: 0;
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

const PlaceholderContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ddd;
    display: ${({ hasBackdropImage }) => hasBackdropImage ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    @media (min-width: 600px) {
        display: ${({ hasPosterImage }) => hasPosterImage ? 'none' : 'flex'};
    }
`;

const PlaceholderIcon = styled(Tv)`
    color: #222;
    min-width: 32px;
    width: 25%;
    @media (min-width: 600px) {
        width: 50%;
    }
`;

const PosterImage = styled.img`
    display: none;
    transition: filter ease-out 0.2s, opacity ease-out 0.2s;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    ${({ isHovered }) => isHovered && `
        filter: grayscale(75%) contrast(110%);
    `}
    @media (min-width: 600px) {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
    
`;

const BackdropImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all ease-out 0.2s;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    ${({ isHovered }) => isHovered && `
        filter: grayscale(75%) contrast(110%);
    `}
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
    background: ${({ isHovered }) => isHovered ? 'rgba(17,17,17,0.4)' : 'none'};
    display: ${({ hasBackdropImage }) => hasBackdropImage ? 'block' : 'none'};
    @media (min-width: 600px) {
        display: ${({ hasPosterImage }) => hasPosterImage ? 'block' : 'none'};
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

const ActionRow = styled.div`
    margin-top: auto;
    height: 50px;
    border-top: solid 1px #ddd;
    padding-left: 20px;
    display: flex;
    align-items: center;
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
    isInline,
    hasUserAction,
    children
}) {

    const { isHovered, containerProps } = useHover();

    const [ ref, inView, entry ] = useInView({ triggerOnce: true });

    const posterImageSrc = useMemo(() => {
        return getImageUrl(posterPath, imageSizeConstants.w300);
    }, [ posterPath ]);

    const backdropImageSrc = useMemo(() => {
        return getImageUrl(backdropPath, imageSizeConstants.w780);
    }, [ backdropPath ]);

    const [ posterImageLoaded, setPosterImageLoaded ] = useState(false);

    const [ backdropImageLoaded, setBackdropImageLoaded ] = useState(false);

    const hasPosterImage = Boolean(posterPath);
    const hasBackdropImage = Boolean(backdropPath);

    useEffect(() => {
        if (!hasPosterImage || posterImageLoaded || !inView) return;
        const img = new Image();
        img.onload = () => {
            setPosterImageLoaded(true);
        }
        img.src = posterImageSrc;
    }, [ hasPosterImage, posterImageLoaded, posterImageSrc, inView ]);

    useEffect(() => {
        if (!hasBackdropImage || backdropImageLoaded || !inView) return;
        const img = new Image();
        img.onload = () => {
            setBackdropImageLoaded(true);
        }
        img.src = backdropImageSrc;
    }, [ hasBackdropImage, backdropImageLoaded, backdropImageSrc, inView ]);

    return (
        <StyledMediaCard>
            <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                <ImageLink ref={ref} {...containerProps} isInline={isInline}>
                    {(hasPosterImage && hasBackdropImage) && (
                        <PlaceholderContainer 
                            hasPosterImage={hasPosterImage}
                            hasBackdropImage={hasBackdropImage}
                        >
                            <PlaceholderIcon />
                        </PlaceholderContainer>
                    )}
                    {hasPosterImage && (
                        <PosterImage
                            key={id} 
                            src={posterImageLoaded ? posterImageSrc : null} 
                            alt={title} 
                            isHovered={isHovered}
                            isLoaded={posterImageLoaded}
                        />
                    )}
                    {hasBackdropImage && (
                        <BackdropImage 
                            src={backdropImageLoaded ? backdropImageSrc : null} 
                            alt={title} 
                            isHovered={isHovered}
                            isLoaded={backdropImageLoaded}
                        />
                    )}
                    {(hasPosterImage || hasBackdropImage) && (
                        <ImageOverlay 
                            isHovered={isHovered}
                            hasPosterImage={hasPosterImage}
                            hasBackdropImage={hasBackdropImage} 
                        />
                    )}
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
                <ActionRow>
                    {hasUserAction ? children : (
                        <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                            <MoreInfoLink>More Info</MoreInfoLink>
                        </Link>
                    )}
                </ActionRow>
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
    // An isInline value of false indicates that at larger viewport sizes the card will take up the
    // full site width, rather than being restricted to the width of a column. When isInline is false
    // additional media queries are applied for larger viewport widths.
    isInline: PropTypes.bool,
    // Indicates whether this component will contain some sort of user interaction button (rate, favourite
    // etc). The buton is provided via the child prop, and this boolean prop simply provides an explicit way
    // of telling the component that is needs to render a user interaction button. 
    hasUserAction: PropTypes.bool
};

import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import CardInfoRow from './CardInfoRow';
import useHover from '../useHover';
import { useInView } from 'react-intersection-observer';
import {
    StyledMediaCard,
    ImageContentContainer,
    PlaceholderContainer,
    PlaceholderIcon,
    PosterImage,
    BackdropImage,
    ImageOverlay,
    TextColumn,
    OverviewText,
    ActionRow,
    MoreInfoLink
} from './mediaCardElements';

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
    children,
    cardRef
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
        <StyledMediaCard ref={cardRef}>
            <Link href={`${urlSubpath}/[id]`} as={`${urlSubpath}/${id}`} passHref>
                <a>
                    <ImageContentContainer ref={ref} {...containerProps} isInline={isInline}>
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
                    </ImageContentContainer>
                </a>
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
                        <Link href={`${urlSubpath}/[id]`} as={`${urlSubpath}/${id}`} passHref>
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
    releaseDate: PropTypes.string,
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
    hasUserAction: PropTypes.bool,
};

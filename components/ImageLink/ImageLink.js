import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import useHover from '../useHover';
import useLazyImage from '../useLazyImage';

const StyledImageLink = styled.a`
    position: relative;
    display: flex;
`;

const PlaceholderContainer = styled.div`
    background: #ddd;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const StyledImage = styled.img`
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
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background ease-out 0.2s;
    cursor: pointer;
    background: ${({ isHovered }) => isHovered ? 'rgba(17,17,17,0.4)' : 'none'};
`;

export function ImageLink({ imagePath, imageSize, alt, linkHref, linkAs, className }) {

    const { isHovered, containerProps } = useHover();

    const {
        hasImage,
        imageSrc,
        isLoaded,
        containerRef
    } = useLazyImage({ imagePath, imageSize })

    return (
        <Link href={linkHref} as={linkAs} passHref>
            <StyledImageLink ref={containerRef}  {...containerProps} className={className}>
                {hasImage ? (
                    <>
                        <StyledImage 
                            isLoaded={isLoaded}
                            isHovered={isHovered}
                            src={isLoaded ? imageSrc : null} 
                            alt={alt} 
                        />
                        <ImageOverlay isHovered={isHovered} />
                    </>
                ) : ( 
                    <PlaceholderContainer />
                )}
            </StyledImageLink>
        </Link>
    );
}

ImageLink.propTypes = {
    imagePath: PropTypes.string,
    imageSize: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    linkHref: PropTypes.string.isRequired,
    linkAs: PropTypes.string.isRequired,
    // This prop will only be present if a styled version of this component is created, ie
    // styled(ImageLink)` ... `
    className: PropTypes.string
};

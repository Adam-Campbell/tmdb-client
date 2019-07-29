import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useImage from '../useImage';

const StyledSmartImage = styled.img`
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    transition: opacity ease-out 0.2s;
    object-fit: cover;
    object-position: center;
`;

const ImagePlaceholderContainer = styled.div`
    background: #ddd;
    display: flex;
`;

function noop() {}

export function SmartImage({ imagePath, imageSize, alt, className, handleClick = noop }) {

    const {
        hasImage,
        imageSrc,
        isLoaded
    } = useImage({ imagePath, imageSize });

    return hasImage ? (
        <StyledSmartImage 
            className={className}
            src={imageSrc}
            alt={alt}
            isLoaded={isLoaded}
            onClick={handleClick}
        />
    ) : (
        <ImagePlaceholderContainer className={className} />
    )
}

SmartImage.propTypes = {
    imagePath: PropTypes.string,
    imageSize: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    // This prop will only be present if a styled version of this component is created, ie
    // styled(ImageLink)` ... `
    className: PropTypes.string,
    handleClick: PropTypes.func
};
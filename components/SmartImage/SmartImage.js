import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useLazyImage from '../useLazyImage';
import ImagePlaceholder from '../ImagePlaceholder';
import { cover } from 'polished';
 
const SmartImageContainer = styled.div`
    position: relative;
`;

const StyledSmartImage = styled.img`
    ${cover()}
    width: 100%;
    height: 100%;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    transition: opacity ease-out 0.2s;
    object-fit: cover;
    object-position: center;
`;

function noop() {}

export function SmartImage({ 
    imagePath, 
    imageSize, 
    alt,
    isPersonImage, 
    isLandscape,
    handleClick = noop, 
    className 
}) {

    const {
        hasImage,
        imageSrc,
        isLoaded,
        containerRef
    } = useLazyImage({ imagePath, imageSize });

    return (
        <SmartImageContainer ref={containerRef} className={className}>
            {hasImage ? (
                <StyledSmartImage 
                    src={isLoaded ? imageSrc : null}
                    alt={alt}
                    isLoaded={isLoaded}
                    onClick={handleClick}
                    data-testid="image-element"
                />
            ) : (
                <ImagePlaceholder  
                    isPersonImage={isPersonImage}
                    isLandscape={isLandscape}
                />
            )}
        </SmartImageContainer>
    );
}

SmartImage.propTypes = {
    imagePath: PropTypes.string,
    imageSize: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    isPersonImage: PropTypes.bool,
    isLandscape: PropTypes.bool,
    handleClick: PropTypes.func,
    // This prop will only be present if a styled version of this component is created, ie
    // styled(ImageLink)` ... `
    className: PropTypes.string
};

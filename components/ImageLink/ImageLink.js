import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import useHover from '../useHover';
import useLazyImage from '../useLazyImage';
import ImagePlaceholder from '../ImagePlaceholder';
import {
    StyledImageLink,
    LinkContentContainer, 
    PlaceholderContainer, 
    StyledImage,
    ImageOverlay
} from './styledElements';
 
export function ImageLink({ 
    imagePath, 
    imageSize, 
    alt, 
    linkHref, 
    linkAs,
    isPersonImage,
    isLandscape, 
    className,
    children
}) {

    const { isHovered, containerProps } = useHover();

    const {
        hasImage,
        imageSrc,
        isLoaded,
        containerRef
    } = useLazyImage({ imagePath, imageSize })

    return (
        <Link href={linkHref} as={linkAs} passHref>
            <a>
                <LinkContentContainer ref={containerRef}  {...containerProps} className={className}>
                    {hasImage ? (
                        <>
                            <StyledImage 
                                isLoaded={isLoaded}
                                isHovered={isHovered}
                                src={isLoaded ? imageSrc : null} 
                                alt={alt} 
                            />
                            <ImageOverlay isHovered={isHovered} />
                            {children}
                        </>
                    ) : (
                        <> 
                            <ImagePlaceholder isPersonImage={isPersonImage} isLandscape={isLandscape} />
                            {children}
                        </>
                    )}
                </LinkContentContainer>
            </a>
        </Link>
    );
}

ImageLink.propTypes = {
    imagePath: PropTypes.string,
    imageSize: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    linkHref: PropTypes.string.isRequired,
    linkAs: PropTypes.string.isRequired,
    isPersonImage: PropTypes.bool,
    isLandscape: PropTypes.bool,
    // This prop will only be present if a styled version of this component is created, ie
    // styled(ImageLink)` ... `
    className: PropTypes.string
};

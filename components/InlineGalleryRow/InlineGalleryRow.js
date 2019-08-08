import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import InlineContentRow from '../InlineContentRow';
import SmartImage from '../SmartImage';

const GalleryImageContainer = styled.div`
    width: calc(50% - 5px);
    margin-top: ${({ theme }) => theme.getSpacing(2)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    @media(min-width: 550px) {
        width: calc(25% - 7.5px);
    }
`;

const InlineGalleryImage = styled(SmartImage)`
    width: 100%;
    padding-bottom: 150%;
`;

export function InlineGalleryRow({ 
    imagesData,
    title,
    linkText,
    linkDestinationHref,
    linkDestinationAs,
    name
}) {
    
    if (imagesData.length === 0) return null;

    return (
            <InlineContentRow
                title={title}
                linkText={linkText}
                linkDestinationAs={linkDestinationAs}
                linkDestinationHref={linkDestinationHref}
            >
                {imagesData.slice(0,4).map(image => (
                    <GalleryImageContainer key={image.file_path}>
                        <InlineGalleryImage 
                            imagePath={image.file_path}
                            imageSize={imageSizeConstants.w342}
                            alt={name}
                            isPersonImage={true}
                        />
                    </GalleryImageContainer>
                ))}
            </InlineContentRow>
    );
}

InlineGalleryRow.propTypes = {
    imagesData: PropTypes.arrayOf(PropTypes.shape({
        aspect_ratio: PropTypes.number,
        file_path: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        vote_average: PropTypes.number,
        vote_count: PropTypes.number
    })).isRequired,
    title: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    linkDestinationHref: PropTypes.string.isRequired,
    linkDestinationAs: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
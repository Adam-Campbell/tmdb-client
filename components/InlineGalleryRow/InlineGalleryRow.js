import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import InlineContentRow from '../InlineContentRow';
import SmartImage from '../SmartImage';

const InlineGalleryImage = styled(SmartImage)`
    width: calc(50% - 5px);
    margin-top: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    object-fit: cover;
    object-position: center;
    @media(min-width: 550px) {
        width: calc(25% - 7.5px);
    }
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
                    <InlineGalleryImage 
                        key={image.file_path}
                        imagePath={image.file_path}
                        imageSize={imageSizeConstants.w342}
                        alt={name}
                    />
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
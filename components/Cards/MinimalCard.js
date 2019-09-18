import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { imageSizeConstants } from '../../utils';
import Link from 'next/link';
import {
    StyledMinimalCard, 
    CardImageLink,
    InfoRow,
    NameLink,
    AdditionalDetailsText
} from './minimalCardElements';

export function MinimalCard({ 
    id, 
    name, 
    imagePath, 
    urlSubpath, 
    additionalDetails, 
    isInline,
    shouldTruncateDetails,
    isPersonImage
}) {

    return (
        <StyledMinimalCard isInline={isInline}>
            <CardImageLink 
                imagePath={imagePath}
                imageSize={imageSizeConstants.w342}
                alt={name}
                linkHref={`${urlSubpath}/[id]`}
                linkAs={`${urlSubpath}/${id}`}
                isPersonImage={isPersonImage}
            />
            <InfoRow>
                <Link href={`${urlSubpath}/[id]`} as={`${urlSubpath}/${id}`} passHref>
                    <NameLink data-testid="name-link">{name}</NameLink>
                </Link>
                {additionalDetails && (
                    <AdditionalDetailsText
                        shouldTruncateDetails={shouldTruncateDetails}    
                    >
                        {additionalDetails}
                    </AdditionalDetailsText>
                )}
            </InfoRow>
        </StyledMinimalCard>
    );
}

MinimalCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    additionalDetails: PropTypes.string,
    imagePath: PropTypes.string,
    urlSubpath: PropTypes.string,
    // When true the string supplied via the additionalDetails props will be truncated via CSS to prevent
    // it from carrying onto multiple lines. 
    shouldTruncateDetails: PropTypes.bool,
    isPersonImage: PropTypes.bool
};

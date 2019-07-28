import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import ImageLink from '../ImageLink';

const StyledMinimalCard = styled.div`
    margin-top: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    ${({ isInline }) => isInline && `
        width: calc(50% - 5px);
        @media (min-width: 550px) {
            width: calc(25% - 7.5px);
        }
    `}
    ${({ isInline }) => isInline || `
        width: calc(50% - 5px);
        margin-right: 10px;
        @media (max-width: 549px) {
            &:nth-child(2n) {
                margin-right: 0;
            }
        }
        @media (min-width: 550px) and (max-width: 767px) {
            width: calc(33.33333% - 6.66666px);
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
        @media (min-width: 768px) and (max-width: 959px) {
            width: calc(25% - 7.5px);
            &:nth-child(4n) {
                margin-right: 0;
            }
        }
        @media (min-width: 960px) {
            width: calc(20% - 8px);
            &:nth-child(5n) {
                margin-right: 0;
            }
        }
    `}
`;

const CardImageLink = styled(ImageLink)`
    padding-bottom: 150%;
`;

const InfoRow = styled.div`
    padding: 10px;
`;

const NameLink = styled.a`
    ${text('body', { fontWeight: 700, fontSize: '0.85rem' })}
    text-decoration: none;
    margin-bottom: 5px;
    display: inline-block;
    &:hover {
        text-decoration: underline;
    }
    @media(min-width: 550px) {
        font-size: 1rem;
    }
`;

const AdditionalDetailsText = styled.span`
    ${text('body', { fontWeight: 300, fontSize: '0.75rem' })}
    display: block;
    max-width: 100%;
    ${({ shouldTruncateDetails }) => shouldTruncateDetails && `
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `}
    @media(min-width: 550px) {
        font-size: 0.85rem;
    }
`;

export function MinimalCard({ 
    id, 
    name, 
    imagePath, 
    urlSubpath, 
    additionalDetails, 
    isInline,
    shouldTruncateDetails 
}) {

    return (
        <StyledMinimalCard isInline={isInline}>
            <CardImageLink 
                imagePath={imagePath}
                imageSize={imageSizeConstants.w342}
                alt={name}
                linkHref={`${urlSubpath}?id=${id}`}
                linkAs={`${urlSubpath}/${id}`}
            />
            <InfoRow>
                <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                    <NameLink>{name}</NameLink>
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
    // Indicates whether the card is part of an inline row or part of a grid that takes up the full
    // page width. Based on this prop the component will set the appropriate media queries for larger
    // viewport widths.
    isInline: PropTypes.bool,
    // When true the string supplied via the additionalDetails props will be truncated via CSS to prevent
    // it from carrying onto multiple lines. 
    shouldTruncateDetails: PropTypes.bool
};

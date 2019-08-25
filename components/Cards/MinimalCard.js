import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import ImageLink from '../ImageLink';
import { ellipsis } from 'polished'

const StyledMinimalCard = styled.div`
    margin-top: ${({ theme }) => theme.getSpacing(2)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    ${({ isInline }) => isInline && `
        width: calc(50% - 5px);
        @media (min-width: 550px) {
            width: calc(25% - 7.5px);
        }
    `}
    ${({ theme, isInline }) => isInline || `
        width: calc(50% - 5px);
        margin-right: ${theme.getSpacing(2)};
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
    padding: ${({ theme }) => theme.getSpacing(2)};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const NameLink = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    text-decoration: none;
    margin-bottom: ${({ theme }) => theme.getSpacing(1)};
    display: inline-block;
    &:hover {
        text-decoration: underline;
    }
    @media(min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.md};
    }
`;

const AdditionalDetailsText = styled.span`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    display: block;
    max-width: 100%;
    ${({ shouldTruncateDetails }) => shouldTruncateDetails && ellipsis()}
    @media(min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    }
`;

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
    // Indicates whether the card is part of an inline row or part of a grid that takes up the full
    // page width. Based on this prop the component will set the appropriate media queries for larger
    // viewport widths.
    isInline: PropTypes.bool,
    // When true the string supplied via the additionalDetails props will be truncated via CSS to prevent
    // it from carrying onto multiple lines. 
    shouldTruncateDetails: PropTypes.bool,
    isPersonImage: PropTypes.bool
};

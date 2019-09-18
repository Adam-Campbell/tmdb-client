import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageLink from '../ImageLink';
import SmartImage from '../SmartImage';
import { imageSizeConstants } from '../../utils';
import { cover, ellipsis } from 'polished';
import Link from 'next/link';

const StyledMediaGridItem = styled.div`
    width: 100%;
    margin-bottom: 20px;
    @media (min-width: 768px) {
        margin-bottom: 0;
        ${({ isFullWidth }) => !isFullWidth && `width: 50%;`}
    }
`;

const MediaGridItemImageLink = styled(ImageLink)`
    position: relative;
    width: 100%;
    display: block;
    padding-bottom: 56.25%;
`;

const ContentContainer = styled.div`
    ${cover()}
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    padding: ${({ theme }) => theme.getSpacing(2)};
`;

const CardName = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-shadow: 1px 1px 0 #000;
    margin-bottom: 0;
    margin-top: auto;
    align-self: flex-end;
`;

const PosterImage = styled(SmartImage)`
    display: none;
    @media (min-width: 768px) {
        display: block;
        width: 80px;
        height: 120px;
        margin-top: auto;
        margin-right: 10px;
    }
`;

export default function MediaGridItem({
    backdropPath,
    posterPath,
    name, 
    linkHref, 
    linkAs, 
    isFullWidth
}) {
    return (
        <StyledMediaGridItem isFullWidth={isFullWidth}>
            <MediaGridItemImageLink
                imagePath={backdropPath}
                imageSize={imageSizeConstants.w780}
                alt={name}
                linkHref={linkHref}
                linkAs={linkAs}
                isLandscape={true}
            >
                <ContentContainer>
                    {isFullWidth && <PosterImage 
                        imagePath={posterPath}
                        imageSize={imageSizeConstants.w185}
                        alt={name}
                    />}
                    <Link href={linkHref} as={linkAs}>
                        <CardName>{name}</CardName>
                    </Link>
                </ContentContainer>
            </MediaGridItemImageLink>
        </StyledMediaGridItem>
    );
}

MediaGridItem.propTypes = {
    backdropPath: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, 
    linkHref: PropTypes.string.isRequired,
    linkAs: PropTypes.string.isRequired,
    isFullWidth: PropTypes.bool.isRequired
};

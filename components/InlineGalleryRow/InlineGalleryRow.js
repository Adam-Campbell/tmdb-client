import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';

const StyledInlineGalleryRow = styled.div`
    margin-top: 0;
    margin-bottom: 40px;
`;

const RowTitle = styled.h2`
    ${text('heading')}
    margin-bottom: 0;
    margin-top: 0;
`;

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SeeMoreLink = styled.a`
    ${text('body')}
    display: inline-block;
    margin-top: 20px;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Image = styled.img`
    width: calc(50% - 10px);
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    @media(min-width: 550px) {
        width: calc(25% - 10px);
    }
`;

export function InlineGalleryRow({ 
    imagesData,
    title,
    linkText,
    linkDestinationHref,
    linkDestinationAs 
}) {
    const suitableImages = imagesData.filter(image => image.aspect_ratio === 0.66666666666667).slice(0,4);
    if (suitableImages.length === 0) return null;

    return (
        <StyledInlineGalleryRow>
            <RowTitle>{title}</RowTitle>
            <CardsContainer>
                {suitableImages.map(image => (
                    <Image 
                        key={image.file_path}
                        src={getImageUrl(image.file_path, imageSizeConstants.w342)}
                        onClick={() => console.log(image)}
                    />
                ))}
            </CardsContainer>
            <Link href={linkDestinationHref} as={linkDestinationAs} passHref>
                <SeeMoreLink>{linkText}</SeeMoreLink>
            </Link>
        </StyledInlineGalleryRow>
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
    linkDestinationAs: PropTypes.string.isRequired
};
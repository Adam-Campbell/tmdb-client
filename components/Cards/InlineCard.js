import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getImageUrl, imageSizeConstants, getSrcset, text } from '../../utils';
import Link from 'next/link';

const StyledInlineCard = styled.div`
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    width: calc(50% - 10px);
    @media(min-width: 550px) {
        width: calc(25% - 10px);
    }
`;

const ImageLink = styled.a`
    position: relative;
    display: flex;
`;

const Image = styled.img`
    width: 100%;
`;

const ImageOverlay = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition: background ease-out 0.2s;
    cursor: pointer;
    &:hover {
        background: rgba(17,17,17,0.4)
    }
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

const DetailsText = styled.span`
    ${text('body', { fontWeight: 300, fontSize: '0.75rem' })}
    display: block;
    max-width: 100%;
    @media(min-width: 550px) {
        font-size: 0.85rem;
    }
`;

export function InlineCard({ id, name, additionalDetails, imagePath, urlSubpath }) {
    const imageSrc = getImageUrl(imagePath, imageSizeConstants.w342);
    return (
        <StyledInlineCard>
            <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                <ImageLink>
                    <Image 
                        src={imageSrc} 
                        alt=""
                    />
                    <ImageOverlay />
                </ImageLink>
            </Link>
            <InfoRow>
                <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                    <NameLink>{name}</NameLink>
                </Link>
                {additionalDetails && <DetailsText>{additionalDetails}</DetailsText>}
            </InfoRow>
        </StyledInlineCard>
    );
}

InlineCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    additionalDetails: PropTypes.string,
    imagePath: PropTypes.string,
    urlSubpath: PropTypes.string
};
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getImageUrl, imageSizeConstants, getSrcset } from '../../utils';
import Link from 'next/link';

const StyledPersonCard = styled.div`
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    width: calc(50% - 10px);
    @media(min-width: 600px) {
        width: calc(33.33333% - 10px);
    }
    @media(min-width: 768px) {
        width: calc(25% - 10px);
    }
    @media(min-width: 1080px) {
        width: calc(20% - 10px);
    }
`;

const PersonImageLink = styled.a`
    position: relative;
    display: block;
`;

const PersonImage = styled.img`
    width: 100%;
`;

const PersonImageOverlay = styled.div`
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
    font-family: sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    color: #222;
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

const KnownFor = styled.span`
    font-family: sans-serif;
    font-weight: 300;
    color: #222;
    font-size: 0.75rem;
    display: block;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @media(min-width: 550px) {
        font-size: 0.85rem;
    }
`;

export function PersonCard({ profilePath, name, knownFor, id }) {
    const imageSrc = getImageUrl(profilePath, imageSizeConstants.w342);
    return (
        <StyledPersonCard>
            <Link href={`/person?id=${id}`} as={`/person/${id}`} passHref>
                <PersonImageLink>
                    <PersonImage src={imageSrc} />
                    <PersonImageOverlay />
                </PersonImageLink>
            </Link>
            <InfoRow>
                <Link href={`/person?id=${id}`} as={`/person/${id}`} passHref>
                    <NameLink>{name}</NameLink>
                </Link>
                <KnownFor>{knownFor}</KnownFor>
            </InfoRow>
        </StyledPersonCard>
    );
}

PersonCard.propTypes = {
    profilePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    knownFor: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
};

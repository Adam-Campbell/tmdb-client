import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getImageUrl, imageSizeConstants, getSrcset } from '../../utils';
import Link from 'next/link';
import CardInfoRow from './CardInfoRow';

const StyledBackdropCard = styled.div`
    width: 100%;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    @media(min-width: 768px) {
        width: calc(50% - 10px);
    }
`;

const BackdropImageLink = styled.a`
    display: flex;
    position: relative;
    padding-bottom: 56.3%;
`;

const BackdropImage = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const BackdropImageOverlay = styled.div`
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

/*
    Some movies do not have a backdropPath - the field is left null. I need to add a way to handle
    this. 

    Intrinsic size for backdrop images is 780 x 439 - that means padding bottom of 56.3%
*/
export function BackdropCard({ id, title, releaseDate, averageRating, backdropPath }) {
    const backdropSrcset = getSrcset(backdropPath);
    const backdropSrc = getImageUrl(backdropPath, imageSizeConstants.w780);
    return (
        <StyledBackdropCard>
            <Link href="/" passHref>
                <BackdropImageLink>
                    <BackdropImage
                        src={backdropSrc} 
                        srcSet={backdropSrcset}
                        sizes={`
                            (max-width: 767px) 100vw,
                            50vw
                        `}
                        alt="A movie poster" 
                    />
                    <BackdropImageOverlay />
                </BackdropImageLink>
            </Link>
            <CardInfoRow 
                rating={averageRating}
                title={title}
                releaseDate={releaseDate}
            />
        </StyledBackdropCard>
    );
}

BackdropCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    averageRating: PropTypes.number.isRequired,
    backdropPath: PropTypes.string
};

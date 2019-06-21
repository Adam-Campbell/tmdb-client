import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import Rating from '../Rating';
import { getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import { Subheading } from './elements';
import CreatorsList from './CreatorsList';

// is there a better semantic element to use here?
const MediaHeaderContainer = styled.div`
    position: relative;
`;

const BackdropImageHolder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ imageUrl }) => `url('${imageUrl}')`};
    background-size: cover;
    background-position: center;
    filter: grayscale(75%) contrast(110%);
`;

const BackdropImageOverlay = styled.div`
    background: rgba(0,0,0,0.8);
    position: relative;
`;

const PosterImage = styled.img`
    display: none;
    margin-right: 40px;
    height: auto;
    flex-shrink: 0;
    @media(min-width: 600px) {
        display: block;
        width: 200px;
        height: 300px;
    }
    @media(min-width: 768px) {
        width: 300px;
        height: 450px;
    }
`;

const MediaHeaderContentRow = styled(Row)`
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
`;

const MediaTitle = styled.h1`
    font-family: sans-serif;
    font-weight: 700;
    font-size: 2rem;
    color: #fff;
`;

const MediaTagline = styled.p`
    font-family: serif;
    font-weight: 700;
    font-size: 1.25rem;
    font-style: italic;
    color: #fff;
`;

const MediaOverview = styled.p`
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #fff;
`;


export function MediaHeader({ 
    backdropPath, 
    posterPath, 
    id, 
    title, 
    averageRating, 
    overview, 
    tagline, 
    createdBy 
}) {
    const backdropUrl = getImageUrl(backdropPath, 'original');
    const posterUrl = getImageUrl(posterPath, imageSizeConstants.w342);
    return (
        <MediaHeaderContainer>
            <BackdropImageHolder imageUrl={backdropUrl} />
            <BackdropImageOverlay>
                <MediaHeaderContentRow>
                    <PosterImage src={posterUrl} alt="" />
                    <div>

                        <MediaTitle>{title}</MediaTitle>
                        {tagline && <MediaTagline>{tagline}</MediaTagline>}

                        <div>
                            <Rating rating={averageRating} baseSize={76} />
                        </div>
                        
                        {overview && (
                            <>
                                <Subheading>Overview</Subheading>
                                <MediaOverview>{overview}</MediaOverview>
                            </>
                        )}

                        {createdBy && createdBy.length > 0 && <CreatorsList creators={createdBy} />}
                    </div>
                </MediaHeaderContentRow>
            </BackdropImageOverlay>
        </MediaHeaderContainer>
    );
}

MediaHeader.propTypes = {
    backdropPath: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    averageRating: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    // tagline only present for movies
    tagline: PropTypes.string,
    // createdBy only present for tv shows
    createdBy: PropTypes.arrayOf(PropTypes.shape({
        credit_id: PropTypes.string,
        gender: PropTypes.number,
        id: PropTypes.number,
        name: PropTypes.string,
        profile_path: PropTypes.string
    }))
};

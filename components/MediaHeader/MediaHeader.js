import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import Rating from '../Rating';
import { getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import CreatorsList from './CreatorsList';
import { text } from '../../utils';
import { connect } from 'react-redux';
import { getMovieData } from '../../reducers/movieReducer';
import { getShowData } from '../../reducers/showReducer';
import { getSessionType } from '../../reducers/sessionReducer';
import UserInteractionsRow from './UserInteractionsRow';
import SmartImage from '../SmartImage';

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

const PosterImage = styled(SmartImage)`
    display: none;
    margin-right: 40px;
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
    ${text('heading', { fontSize: '2rem', color: '#fff' })}
`;

const MediaTagline = styled.p`
    ${text('heading', { fontFamily: 'serif', fontSize: '1.25rem', color: '#fff' })}
    font-style: italic;
`;

const Subheading = styled.p`
    ${text('heading', { fontSize: '1rem', color: '#fff' })}
`;

const MediaOverview = styled.p`
    ${text('body', { color: '#fff' })}
`;


const InteractionRow = styled.div`
    display: flex;
    align-items: center;
`;

const RatingContainer = styled.div`
    width: 80px;
    height: 80px;
    margin-right: 20px;
`;

export function MediaHeader({ 
    mediaType,
    sessionType,
    backdropPath,
    posterPath,
    title,
    averageRating,
    overview,
    tagline,
    createdBy
}) {

    const backdropUrl = useMemo(() => {
        return getImageUrl(backdropPath, 'original')
    }, [ backdropPath ]);

    //const posterUrl = getImageUrl(posterPath, imageSizeConstants.w342);

    return (
        <MediaHeaderContainer>
            <BackdropImageHolder imageUrl={backdropUrl} />
            <BackdropImageOverlay>
                <MediaHeaderContentRow>
                    <PosterImage 
                        imagePath={posterPath}
                        imageSize={imageSizeConstants.w342}
                        alt={title} 
                    />
                    <div>

                        <MediaTitle>{title}</MediaTitle>
                        {tagline && <MediaTagline>{tagline}</MediaTagline>}

                        <InteractionRow>
                            <RatingContainer>
                                <Rating rating={averageRating} />
                            </RatingContainer>
                            {sessionType === 'USER' && (
                                <UserInteractionsRow mediaType={mediaType} />
                            )}
                        </InteractionRow>
                        
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
    mediaType: PropTypes.oneOf(['movie', 'tv']),
    sessionType: PropTypes.oneOf(['USER', 'GUEST', null]),
    backdropPath: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
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

function mapState(state, ownProps) {
    const m = ownProps.mediaType === 'movie' ? getMovieData(state) : getShowData(state);
    return {
        sessionType: getSessionType(state),
        backdropPath: m.backdrop_path,
        posterPath: m.poster_path,
        title: ownProps.mediaType === 'movie' ? m.title : m.name,
        averageRating: m.vote_average,
        overview: m.overview,
        tagline: m.tagline,
        createdBy: m.created_by
    };
}

export const ConnectedMediaHeader = connect(mapState)(MediaHeader);

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
import { cover } from 'polished';

// is there a better semantic element to use here?
const MediaHeaderContainer = styled.div`
    position: relative;
`;

const BackdropImageHolder = styled.div`
    ${cover()}
    width: 100%;
    height: 100%;
    background: ${({ imageUrl }) => `url('${imageUrl}')`};
    background-size: cover;
    background-position: center;
    filter: grayscale(75%) contrast(110%);
`;

const BackdropImageOverlay = styled.div`
    background: ${({ theme }) => theme.colors.overlayStrong};
    position: relative;
`;

const PosterImage = styled(SmartImage)`
    display: none;
    margin-right: ${({ theme }) => theme.getSpacing(4)};
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
    padding: ${({ theme }) => theme.getSpacing(4, 0)};
`;

const MediaTitle = styled.h1`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: 2rem;
`;

const MediaTagline = styled.p`
    font-family: serif;
    font-size: ${({ theme }) => theme.fontSizes.body.xl};
    font-style: italic;
    color: ${({ theme }) => theme.colors.white};
`;

const Subheading = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

const MediaOverview = styled.p`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

const InteractionRow = styled.div`
    display: flex;
    align-items: center;
`;

const RatingContainer = styled.div`
    width: 80px;
    height: 80px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
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

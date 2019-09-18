import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import { getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import CreatorsList from './CreatorsList';
import { connect } from 'react-redux';
import { getMovieData } from '../../reducers/movieReducer';
import { getShowData } from '../../reducers/showReducer';
import { getHasSession } from '../../reducers/sessionReducer';
import UserInteractionsRow from './UserInteractionsRow';
import {
    MediaHeaderContainer,
    BackdropImageHolder,
    BackdropImageOverlay,
    PosterImage,
    MediaHeaderContentRow,
    MediaTitle,
    MediaTagline,
    Subheading,
    MediaOverview,
    InteractionRow,
    RatingContainer
} from './mediaHeaderElements';

export function MediaHeader({ 
    isMovie,
    hasSession,
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
                            {hasSession && (
                                <UserInteractionsRow isMovie={isMovie} />
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
    isMovie: PropTypes.bool.isRequired,
    hasSession: PropTypes.bool.isRequired,
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
    const m = ownProps.isMovie ? getMovieData(state) : getShowData(state);
    return {
        hasSession: getHasSession(state),
        backdropPath: m.backdrop_path,
        posterPath: m.poster_path,
        title: m.title || m.name,
        averageRating: m.vote_average,
        overview: m.overview,
        tagline: m.tagline,
        createdBy: m.created_by
    };
}

export const ConnectedMediaHeader = connect(mapState)(MediaHeader);

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Star, Bookmark, Heart, List } from 'styled-icons/fa-solid';
import { connect } from 'react-redux';
import { 
    markFavourite, 
    editWatchlist, 
    rateMovie, 
    removeMovieRating,
    rateShow,
    removeShowRating 
} from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { getShowData } from '../../reducers/showReducer';
import ReactToolTip from 'react-tooltip';
import StarRatingPopup from '../StarRatingPopup';
import usePopup from '../usePopup';
import InteractionButton from './InteractionButton';
import AddToListModal from '../AddToListModal';

const RateIcon = styled(Star)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

const ListIcon = styled(List)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

const WatchlistIcon = styled(Bookmark)`
    width: 10px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

const FavouriteIcon = styled(Heart)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

const StyledUserInteractionsRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    max-width: ${({ includesAllButtons }) => includesAllButtons ? '250px' : '188px'};
`;

function UserInteractionsRow({ 
    mediaType,
    id,
    isFavourite,
    isInWatchlist,
    rated,
    markFavourite,
    editWatchlist,
    rateMovie,
    removeMovieRating,
    rateShow,
    removeShowRating
}) {
    
    const [ isShowingAddToListModal, setIsShowingAddToListModal ] = useState(false);

    const {
        isShowingPopup,
        windowTopOffset,
        popupX,
        popupY,
        anchorEl,
        openPopup,
        closePopup
    } = usePopup({ popupWidth: 250, popupHeight: 50, popupAlignment: 'BOTTOM' });

    const ratingFn = mediaType === 'movie' ? rateMovie : rateShow;
    const removeRatingFn = mediaType === 'movie' ? removeMovieRating : removeShowRating;

    function handleRatingModalChange(rating) {
        ratingFn(rating * 2, id);
    }

    const score = rated ? Math.floor(rated.value / 2) : 0;

    return (
        <StyledUserInteractionsRow includesAllButtons={mediaType === 'movie'}>
            {mediaType === 'movie' && (
                <InteractionButton
                    isBeingUsed={false}
                    handleClick={() => setIsShowingAddToListModal(true)}
                    inUseColor="#fff"
                    tooltipText="Add to list"
                >
                    {({ iconColor }) => <ListIcon iconColor={iconColor} />}
                </InteractionButton>
            )}
            <InteractionButton
                isBeingUsed={isFavourite}
                handleClick={() => markFavourite(mediaType, id, !isFavourite)}
                inUseColor="#dc1f3b"
                tooltipText={isFavourite ? 'Remove from your favourites' : 'Mark as favourite'}
            >
                {({ iconColor }) => <FavouriteIcon iconColor={iconColor} />}
            </InteractionButton>
            <InteractionButton
                isBeingUsed={isInWatchlist}
                handleClick={() => editWatchlist(mediaType, id, !isInWatchlist)}
                inUseColor="#43cbe8"
                tooltipText={isInWatchlist ? 'Remove from your watchlist' : 'Add to your watchlist'}
            >
                {({ iconColor }) => <WatchlistIcon iconColor={iconColor} />}
            </InteractionButton>
            <InteractionButton
                isBeingUsed={Boolean(rated)}
                handleClick={openPopup}
                inUseColor="#f58a0b"
                tooltipText={Boolean(rated) ? `Rated ${rated.value}` : 'Rate it!'}
                iconRef={anchorEl}
            >
                {({ iconColor }) => <RateIcon iconColor={iconColor} />}
            </InteractionButton>
            <ReactToolTip 
                type="light"
                place="bottom"
                effect="solid"
                className="custom-tooltip"
            />
            <StarRatingPopup 
                isShowingModal={isShowingPopup}
                closeModal={closePopup}
                score={score} 
                posX={popupX}
                posY={popupY}
                topOffset={windowTopOffset}
                handleChange={handleRatingModalChange}
                handleRemove={() => removeRatingFn(id)}
            />
            <AddToListModal 
                isOpen={isShowingAddToListModal}
                handleClose={() => setIsShowingAddToListModal(false)}
                movieId={id}
            />
        </StyledUserInteractionsRow>
    );
}

UserInteractionsRow.propTypes = {
    mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
    id: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    isInWatchlist: PropTypes.bool.isRequired,
    rated: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            value: PropTypes.number
        })
    ]).isRequired
};

function mapState(state, ownProps) {
    const m = ownProps.mediaType === 'movie' ? getMovieData(state) : getShowData(state);
    return {
        id: m.id,
        isFavourite: m.account_states.favorite,
        rated: m.account_states.rated,
        isInWatchlist: m.account_states.watchlist
    };
}

export default connect(mapState, { 
    markFavourite, 
    editWatchlist, 
    rateMovie,
    removeMovieRating,
    rateShow,
    removeShowRating
})(UserInteractionsRow);
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Star, StarHalfAlt, Bookmark, Heart, List } from 'styled-icons/fa-solid';
import { Star as StarEmpty } from 'styled-icons/fa-regular';
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
//import RatingModal from './RatingModal';
import StarRatingPopup from '../StarRatingPopup'

const IconButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 5px;
    background: ${({ isHovered }) => isHovered ? '#fff' : 'none'};
    transition: background ease-out 0.2s;
    cursor: pointer;
`;

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
    max-width: 250px;
`;

function Icon({ handleClick, isBeingUsed, inUseColor, tooltipText, children, iconRef }) {

    const [ isHovered, setIsHovered ] = useState(false);

    const iconColor = isBeingUsed 
                    ? inUseColor
                    : isHovered
                        ? '#222'
                        : '#fff';

    return (
        <>
            <IconButton
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                isHovered={isHovered}
                onClick={handleClick}
                data-tip={tooltipText}
                ref={iconRef}
            >
                {children({
                    iconColor
                })}
            </IconButton>
        </>
    );
}

Icon.propTypes = {
    handleClick: PropTypes.func,
    isBeingUsed: PropTypes.bool,
    inUseColor: PropTypes.string,
    tooltipText: PropTypes.string
};


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
    //#dc1f3b

    const [ isShowingRatingModal, setShowingRatingModal ] = useState(false);
    const [ ratingModalCoords, setRatingModalCoords ] = useState({ x: 0, y: 0 });
    const [ topOffset, setTopOffset ] = useState(0);
    const ratingIconEl = useRef(null);

    const ratingFn = mediaType === 'movie' ? rateMovie : rateShow;
    const removeRatingFn = mediaType === 'movie' ? removeMovieRating : removeShowRating;

    function openRatingModal() {
        const modalWidth = 250;
        const { clientWidth } = document.documentElement;
        const { bottom, left, width } = ratingIconEl.current.getBoundingClientRect();
        const centerX = left + (width / 2);
        //const modalY = bottom + 10 + window.scrollY;
        const modalY = bottom + 10;
        // The ternary condition checks whether perfectly centering the modal relative to the icon
        // will result in the modal overflowing the right hand side of the viewport. If it won't cause
        // an overflow then perfect centering is used, if it will cause an overflow then the appropriate
        // x coord is used to align the edge of the modal with the edge of the viewport. 
        const modalX = (centerX + (modalWidth / 2) > clientWidth) 
                ? clientWidth - modalWidth 
                : centerX - (modalWidth / 2);

        setRatingModalCoords({
            x: modalX,
            y: modalY
        });
        setTopOffset(window.scrollY);
        setShowingRatingModal(true);
    }

    function handleRatingModalChange(rating) {
        ratingFn(rating * 2, id);
    }


    const score = rated ? Math.floor(rated.value / 2) : 0;

    return (
        <StyledUserInteractionsRow>
            <Icon
                isBeingUsed={false}
                handleClick={() => {}}
                inUseColor="#fff"
                tooltipText="Add to list"
            >
                {({ iconColor }) => <ListIcon iconColor={iconColor} />}
            </Icon>
            <Icon
                isBeingUsed={isFavourite}
                handleClick={() => markFavourite(mediaType, id, !isFavourite)}
                inUseColor="#dc1f3b"
                tooltipText={isFavourite ? 'Remove from your favourites' : 'Mark as favourite'}
            >
                {({ iconColor }) => <FavouriteIcon iconColor={iconColor} />}
            </Icon>
            <Icon
                isBeingUsed={isInWatchlist}
                handleClick={() => editWatchlist(mediaType, id, !isInWatchlist)}
                inUseColor="#43cbe8"
                tooltipText={isInWatchlist ? 'Remove from your watchlist' : 'Add to your watchlist'}
            >
                {({ iconColor }) => <WatchlistIcon iconColor={iconColor} />}
            </Icon>
            <Icon
                isBeingUsed={Boolean(rated)}
                handleClick={openRatingModal}
                inUseColor="#f58a0b"
                tooltipText={Boolean(rated) ? `Rated ${rated.value}` : 'Rate it!'}
                iconRef={ratingIconEl}
            >
                {({ iconColor }) => <RateIcon iconColor={iconColor} />}
            </Icon>
            <ReactToolTip 
                type="light"
                place="bottom"
                effect="solid"
                className="custom-tooltip"
            />
            <StarRatingPopup 
                isShowingModal={isShowingRatingModal}
                closeModal={() => setShowingRatingModal(false)}
                score={score} 
                handleChange={handleRatingModalChange}
                handleRemove={() => removeRatingFn(id)}
                posX={ratingModalCoords.x}
                posY={ratingModalCoords.y}
                topOffset={topOffset}
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
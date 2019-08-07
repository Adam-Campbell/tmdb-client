import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
    rateMovie, 
    removeMovieRating,
    rateShow,
    removeShowRating 
} from '../../actions';
import useHover from '../../components/useHover';
import usePopup from '../../components/usePopup';
import { text } from '../../utils';
import StarRatingPopup from '../../components/StarRatingPopup';

const StyledCardRatingButton = styled.button`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(1)};
    background: none;
    border: none;
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: 0.85rem;
    cursor: pointer;
`;

const CurrentRating = styled.span`
    border: solid 2px ${({ bgColour }) => bgColour};
    border-radius: 50%;
    background: ${({ bgColour }) => bgColour};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    transition: all ease-out 0.2s;
    margin-right: ${({ theme }) => theme.getSpacing(1)};
`;

function CardRatingButton({ 
    userRating,
    mediaType,
    id,
    rateMovie,
    removeMovieRating,
    rateShow,
    removeShowRating
}) {

    const { isHovered, containerProps } = useHover();
    const {
        isShowingPopup,
        windowTopOffset,
        popupX,
        popupY,
        anchorEl,
        openPopup,
        closePopup
    } = usePopup({ popupWidth: 250, popupHeight: 50, popupAlignment: 'RIGHT' });

    const ratingFn = mediaType === 'movie' ? rateMovie : rateShow;
    const removeRatingFn = mediaType === 'movie' ? removeMovieRating : removeShowRating;

    function handlePopupChange(rating) {
        ratingFn(rating * 2, id);
    }

    const score = Math.floor(userRating / 2);

    let bgColour;
    if (isHovered) {
        bgColour = '#222';
    } else if (userRating >= 7) {
        bgColour = '#6ee843';
    } else if (userRating >= 4) {
        bgColour = '#f58a0b';
    } else {
        bgColour = '#dc1f3b';
    }

    return (
        <>
            <StyledCardRatingButton 
                isHovered={isHovered} 
                {...containerProps}
                onClick={openPopup}
                ref={anchorEl}
            >
                <CurrentRating  bgColour={bgColour}>{userRating}</CurrentRating>
                Your Rating
            </StyledCardRatingButton>
            {isShowingPopup && <StarRatingPopup 
                isShowingModal={isShowingPopup}
                closeModal={closePopup}
                score={score}
                posX={popupX}
                posY={popupY}
                topOffset={windowTopOffset}
                handleChange={handlePopupChange}
                handleRemove={() => removeRatingFn(id)}
            />}
        </>
    );
}

CardRatingButton.propTypes = {
    userRating: PropTypes.number.isRequired,
    mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
    id: PropTypes.number.isRequired
}

export const ConnectedCardRatingButton = connect(undefined, {
    rateMovie,
    removeMovieRating,
    rateShow,
    removeShowRating
})(CardRatingButton)
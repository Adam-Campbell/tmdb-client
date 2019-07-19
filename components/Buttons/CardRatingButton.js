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
import { text } from '../../utils';
import StarRatingPopup from '../../components/StarRatingPopup';

const StyledCardRatingButton = styled.button`
    display: flex;
    align-items: center;
    padding: 5px;
    background: none;
    border: none;
    ${text('body', { fontSize: '0.85rem', fontWeight: 700 })}
    cursor: pointer;
`;

const CurrentRating = styled.span`
    border: solid 2px ${({ bgColour }) => bgColour};
    border-radius: 50%;
    background: ${({ bgColour }) => bgColour};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    transition: all ease-out 0.2s;
    margin-right: 5px;
`;

/*

Each CardRatingButton will have its own associated StarRatingPopup. 

The CardRatingButton will maintain all of the state that the user interaction row was maintaining 
in the previous usage. Specifically it needs to track whether the modal should be open, and what the
coords of some DOM element were during the most recent click.

I will try to have the ratings poppup only be rendered when the isOpen state is true, and will see if
that has any effects on the modal functionality.

The CardRatingButton component will be connected to the store and so will be able to dispatch the rating
actions directly. In order for it to do this it will need to be passed the id of the entity it has to rate,
as well as the media type. 



*/


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
    const [ isShowingPopup, setShowingPopup ] = useState(false);
    const [ popupCoords, setPopupCoords ] = useState({ x: 0, y: 0 });
    const [ topOffset, setTopOffset ] = useState(0);
    const iconEl = useRef(null);

    const ratingFn = mediaType === 'movie' ? rateMovie : rateShow;
    const removeRatingFn = mediaType === 'movie' ? removeMovieRating : removeShowRating;

    function openRatingPopup() {
        const modalWidth = 250;
        const modalHeight = 50;
        const { clientWidth } = document.documentElement;
        const { right, top, height } = iconEl.current.getBoundingClientRect();
        const modalToClickedElGutter = 10;
        const minWindowGutter = 10;
        
        const modalY = top + (height / 2) - (modalHeight / 2);
        const idealXPos = right + modalToClickedElGutter;
        const modalX = idealXPos + modalWidth <= clientWidth - minWindowGutter
                       ? idealXPos
                       : clientWidth - minWindowGutter - modalWidth;
        setPopupCoords({
            x: modalX,
            y: modalY
        });
        setTopOffset(window.scrollY);
        setShowingPopup(true);
    }

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
                onClick={openRatingPopup}
                ref={iconEl}
            >
                <CurrentRating  bgColour={bgColour}>{userRating}</CurrentRating>
                Your Rating
            </StyledCardRatingButton>
            {isShowingPopup && <StarRatingPopup 
                isShowingModal={isShowingPopup}
                closeModal={() => setShowingPopup(false)}
                score={score}
                posX={popupCoords.x}
                posY={popupCoords.y}
                topOffset={topOffset}
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
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Star } from 'styled-icons/fa-solid';
import useHover from '../useHover';
import { connect } from 'react-redux';
import { rateEpisode, removeEpisodeRating } from '../../actions';
import StarRatingPopup from '../StarRatingPopup';

const StyledRatingButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px #222;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    background: ${({ isHovered }) => isHovered ? '#222' : 'none'};
    transition: background ease-out 0.2s;
    cursor: pointer;
`;

const RateIcon = styled(Star)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

function EpisodeRatingButton({ 
    showId,
    seasonNumber,
    episodeNumber,
    userRating,
    rateEpisode,
    removeEpisodeRating
}) {

    const { isHovered, containerProps } = useHover();
    const [ isShowingPopup, setShowingPopup ] = useState(false);
    const [ popupCoords, setPopupCoords ] = useState({ x: 0, y: 0 });
    const [ topOffset, setTopOffset ] = useState(0);
    const buttonEl = useRef(null);

    function openRatingPopup() {
        const modalWidth = 250;
        const modalHeight = 50;
        const { clientWidth } = document.documentElement;
        const { right, top, height } = buttonEl.current.getBoundingClientRect();
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
        rateEpisode(showId, seasonNumber, episodeNumber, rating * 2);
    }

    const iconColor = userRating 
                    ? '#f58a0b'
                    : isHovered
                        ? '#fff'
                        : '#222';

    const score = userRating ? Math.floor(userRating.value / 2) : 0;

    return (
        <>
            <StyledRatingButton 
                ref={buttonEl} 
                isHovered={isHovered} 
                {...containerProps}
                onClick={openRatingPopup}
            >
                <RateIcon iconColor={iconColor} />
            </StyledRatingButton>
            {isShowingPopup && <StarRatingPopup 
                isShowingModal={isShowingPopup}
                closeModal={() => setShowingPopup(false)}
                score={score}
                posX={popupCoords.x}
                posY={popupCoords.y}
                topOffset={topOffset}
                handleChange={handlePopupChange}
                handleRemove={() => removeEpisodeRating(showId, seasonNumber, episodeNumber)}
            />}
        </>
    );
}

EpisodeRatingButton.propTypes = {
    showId: PropTypes.number.isRequired,
    seasonNumber: PropTypes.number.isRequired,
    episodeNumber: PropTypes.number.isRequired,
    userRating: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            value: PropTypes.number
        })
    ]).isRequired
};

export const ConnectedEpisodeRatingButton = connect(undefined, {
    rateEpisode,
    removeEpisodeRating
})(EpisodeRatingButton)
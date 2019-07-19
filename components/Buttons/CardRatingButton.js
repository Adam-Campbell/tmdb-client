import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../../components/useHover';
import { text } from '../../utils';

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


export function CardRatingButton({ onClick, userRating }) {

    const { isHovered, containerProps } = useHover();

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
        <StyledCardRatingButton 
            isHovered={isHovered} 
            onClick={onClick}
            {...containerProps}
        >
            <CurrentRating bgColour={bgColour}>{userRating}</CurrentRating>
            Your Rating
        </StyledCardRatingButton>
    );
}

CardRatingButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    userRating: PropTypes.number.isRequired
}
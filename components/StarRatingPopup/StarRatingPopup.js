import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { Star, StarHalfAlt, Bookmark, Heart, List } from 'styled-icons/fa-solid';
import { Star as StarEmpty } from 'styled-icons/fa-regular';
import { Cancel } from 'styled-icons/material';
import { NoEntry } from 'styled-icons/boxicons-solid';
import { text } from '../../utils';
import { hideVisually } from 'polished';

const Radio = styled.input`
    ${hideVisually()}
`;

const HiddenDescription = styled.span`
    ${hideVisually()}
`;

const Label = styled.label`
    cursor: pointer;
`;

const StarIcon = styled(Star)`
    color: ${({ theme, isSelected }) => isSelected ? theme.colors.info : theme.colors.uiSecondary};
    width: 30px;
    margin: ${({ theme }) => theme.getSpacing(0, 1)};
`;

const ModalTitle = styled.h3`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ClearRatingIcon = styled(NoEntry)`
    width: 20px;
    color: ${({ theme }) => theme.colors.warning};
    margin-right: auto;
`;

const starsData = [
    { value: 1, id: 'star1', label: '1 star' },
    { value: 2, id: 'star2', label: '2 stars' },
    { value: 3, id: 'star3', label: '3 stars' },
    { value: 4, id: 'star4', label: '4 stars' },
    { value: 5, id: 'star5', label: '5 stars' }
];

export function StarRatingPopup({ 
    isShowingModal, 
    closeModal, 
    score, 
    posX, 
    posY, 
    handleChange,
    handleRemove,
    topOffset
}) {

    const [ rating, setRating ] = useState(score);
    const [ localRating, setLocalRating ] = useState(score);

    useEffect(() => {
        function closeOnScroll() {
            if (isShowingModal) {
                closeModal();
            }
        }
        window.addEventListener('scroll', closeOnScroll);
        return function cleanup() {
            window.removeEventListener('scroll', closeOnScroll);
        }
    }, [isShowingModal, closeModal])

    function handleInputChange(evt) {
        const newRating = parseInt(evt.target.value);
        setRating(newRating);
        setLocalRating(newRating);
        handleChange(newRating);
    }

    function resetRating() {
        setLocalRating(rating);
    }


    return (
        <ReactModal
            isOpen={isShowingModal}
            overlayClassName="rating-modal__overlay"
            className="rating-modal__content-container"
            shouldCloseOnEscape={true}
            onRequestClose={closeModal}
            style={{ 
                content: { top: posY, left: posX },
                overlay: {
                    position: 'absolute',
                    top: topOffset,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'none'
                  } 
            }}
            
        >
            <ContentContainer data-testid="star-rating-popup-container">
                <ClearRatingIcon onClick={() => {
                    handleRemove();
                    setRating(0);
                    setLocalRating(0);
                }} />
                <form action="#" id="star-rating" onMouseLeave={resetRating}>
                    {starsData.map(star => (
                        <React.Fragment key={star.id}>
                            <Radio
                                value={star.value}
                                id={star.id}
                                type="radio"
                                name="rating"
                                checked={rating === star.value}
                                onChange={handleInputChange}
                            />
                            <Label 
                                htmlFor={star.id}
                                onMouseEnter={() => setLocalRating(star.value)}
                            >
                                <HiddenDescription>{star.label}</HiddenDescription>
                                <StarIcon isSelected={localRating >= star.value} />
                            </Label>
                        </React.Fragment>
                    ))}
                </form>
            </ContentContainer>
        </ReactModal>
    );
}
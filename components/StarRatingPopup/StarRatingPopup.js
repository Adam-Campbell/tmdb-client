import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { Star, StarHalfAlt, Bookmark, Heart, List } from 'styled-icons/fa-solid';
import { Star as StarEmpty } from 'styled-icons/fa-regular';
import { Cancel } from 'styled-icons/material';
import { NoEntry } from 'styled-icons/boxicons-solid';
import { text } from '../../utils';

const visuallyHidden = {
    border: 0,
    clip: 'rect(0,0,0,0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: '1px'
};

const Radio = styled.input`
    border: 0;
    clip: rect(0,0,0,0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

const HiddenDescription = styled.span`
    border: 0;
    clip: rect(0,0,0,0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

const Label = styled.label`
    cursor: pointer;
`;

const StarIcon = styled(Star)`
    color: ${({ isSelected }) => isSelected ? '#f58a0b' : '#ddd'};
    width: 30px;
    margin-left: 5px;
    margin-right: 5px;
`;

const ModalTitle = styled.h3`
    ${text('heading', { fontSize: '1.25rem' })}
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ClearRatingIcon = styled(NoEntry)`
    width: 20px;
    color: #dc1f3b;
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
            <ContentContainer>
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
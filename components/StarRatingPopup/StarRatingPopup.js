import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import {
    Radio,
    HiddenDescription,
    Label,
    StarIcon,
    ContentContainer,
    ClearRatingIcon,
} from './styledElements';

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
        setRating(score);
        setLocalRating(score);
    }, [ score ])

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

    function handleKeyDown({ key }) {
        if (/[1-5]/.test(key)) {
            const newRating = parseInt(key);
            setRating(newRating);
            setLocalRating(newRating);
            handleChange(newRating);
        }
    }


    return (
        <ReactModal
            isOpen={isShowingModal}
            overlayClassName="rating-modal__overlay"
            className={{
                base: 'rating-modal__content-container',
                afterOpen: 'rating-modal__content-container--after-open',
                beforeClose: 'rating-modal__content-container--before-close'
            }}
            shouldCloseOnEscape={true}
            closeTimeoutMS={200}
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
                                onKeyDown={handleKeyDown}
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
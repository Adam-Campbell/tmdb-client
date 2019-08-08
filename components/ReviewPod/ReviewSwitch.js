import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { hideVisually } from 'polished';

const StyledReviewSwitch = styled.fieldset`
    border: none;
    padding: ${({ theme }) => theme.getSpacing(3, 0, 0, 0)};
    text-align: center;
`;

const RadioButton = styled.input`
    ${hideVisually()}
`;

const Label = styled.label`
    display: inline-block;
    width: 16px;
    height: 16px;
    border: solid 2px ${({ theme }) => theme.colors.black};
    border-radius: 50%;
    background: none;
    transition: background ease-out 0.2s;
    margin: ${({ theme }) => theme.getSpacing(0, 1)};
    cursor: pointer;
    ${RadioButton}:checked + & {
        background: ${({ theme }) => theme.colors.black};
    }
    
`;

const HiddenDescription = styled.span`
    ${hideVisually()}
`;


export default function ReviewSwitch({ numberOfReviews, currentIndex, setIndex }) {

    const reviewsData = useMemo(() => {
        return Array.from({ length: Math.min(numberOfReviews, 3) })
             .map((el, idx) => ({
                value: idx,
                id: `review-${idx}`,
                label: `Switch to review number ${idx + 1}`
             }));
    }, [ numberOfReviews ])

    return (
        <StyledReviewSwitch>
            {reviewsData.map((data) => (
                <React.Fragment key={data.id}>
                    <RadioButton 
                        type="radio"
                        name="reviews"
                        value={data.value}
                        id={data.id}
                        checked={currentIndex === data.value}
                        onChange={() => setIndex(data.value)}
                    />
                    <Label htmlFor={data.id}>
                        <HiddenDescription>{data.label}</HiddenDescription>
                    </Label>
                </React.Fragment>
            ))}
        </StyledReviewSwitch>
    );
}

ReviewSwitch.propTypes = {
    numberOfReviews: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    setIndex: PropTypes.func.isRequired
};
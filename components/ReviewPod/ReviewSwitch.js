import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
border: 0;
clip: rect(0,0,0,0);
height: 1px;
margin: -1px;
overflow: hidden;
padding: 0;
position: absolute;
width: 1px;
*/

const StyledReviewSwitch = styled.fieldset`
    border: none;
    padding-left: 0;
    padding-right: 0;
    padding-top: 20px;
    padding-bottom: 0;
    text-align: center;
`;

const RadioButton = styled.input`
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
    display: inline-block;
    width: 16px;
    height: 16px;
    border: solid 2px #222;
    border-radius: 50%;
    background: none;
    transition: background ease-out 0.2s;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
    ${RadioButton}:checked + & {
        background: #222;
    }
    
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
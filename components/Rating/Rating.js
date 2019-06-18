import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Change this to an actual span with the rating in it similar to what I initially had. 
const Fallback = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 46px;
    height: 46px;
    border-radius: 23px;
    background: #1a435d;
`;

const RatingContainer = styled.div`
    position: relative;
    width: 46px;
    height: 46px;
    margin-right: 20px;
    flex-shrink: 0;
`;

const Canvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
`;

const RatingText = styled.span`
    display: inline-block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    color: white;
    vertical-align: top;
    &::after {
        content: '%';
        font-size: 0.45rem;
        position: absolute;
    }
`;

/*

    Todo: 
    Add animation so that the ratings arc starts at 0 and animates up to whatever the actual 
    rating is. 

*/

export function Rating({ rating }) {
    const canvasEl = useRef(null);
    useEffect(() => {
        // Canvas rendering logic in here. This logic will only run on the initial mount.

        // Define constants and set up canvas context
        const colors = {
            darkBlue: '#1a435d',
            orange: '#f58a0b',
            green: '#6ee843',
            lightBlue: '#43cbe8',
            blueGrey: '#3a5b6f',
            red: '#dc1f3b'
        };
        const ratingDecimal = rating / 10;
        const arcStartOffset = -Math.PI / 2;
        const fullRotation = Math.PI * 2;
        let arcColor;
        if (rating >= 7) {
            arcColor = colors.green;
        } else if (rating >= 4) {
            arcColor = colors.orange;
        } else {
            arcColor = colors.red;
        }
        const canvas = canvasEl.current;
        const ctx = canvas.getContext('2d');
        
        // Draw the main background
        ctx.fillStyle = colors.darkBlue;
        ctx.beginPath();
        ctx.arc(23, 23, 23, 0, fullRotation);
        ctx.fill();

        // Draw the track for the arc to sit in
        ctx.strokeStyle = colors.blueGrey;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(23, 23, 19, 0, fullRotation);
        ctx.stroke();

        // Draw the arc itself
        ctx.strokeStyle = arcColor;
        ctx.beginPath();
        ctx.arc(23, 23, 19, arcStartOffset, ratingDecimal * fullRotation + arcStartOffset);;
        ctx.stroke();
 
    }, []);
    return (
        <RatingContainer>
            <Canvas 
                ref={canvasEl}
                height="46px"
                width="46px"
            >
                <Fallback/>
            </Canvas>
            <RatingText>{rating*10}</RatingText>
        </RatingContainer>
    );
}

Rating.propTypes = {
    rating: PropTypes.number
};

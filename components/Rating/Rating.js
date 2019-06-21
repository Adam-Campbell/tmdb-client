import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Change this to an actual span with the rating in it similar to what I initially had. 
const Fallback = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ baseSize }) => `${baseSize}px`};
    height: ${({ baseSize }) => `${baseSize}px`};
    border-radius: 50%;
    background: #1a435d;
`;

const RatingContainer = styled.div`
    position: relative;
    width: ${({ baseSize }) => `${baseSize}px`};
    height: ${({ baseSize }) => `${baseSize}px`};;
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
    font-size: ${({ baseSize }) => `${0.3 * baseSize}px`};
    color: white;
    vertical-align: top;
    &::after {
        content: '%';
        font-size: ${({ baseSize }) => `${0.16 * baseSize}px`};
        position: absolute;
    }
`;

/*

    Todo: 
    Add animation so that the ratings arc starts at 0 and animates up to whatever the actual 
    rating is. 

    Can I use percentages / ratios for everything such that I can specify a base size as a prop 
    allowing me to alter the size with that prop, and everything scales according to that base size?

    Things that need to scale in elements:

    Fallback
        width
        height
        border-radius
    RatingContainer
        width
        height
    RatingText
        font-size
        font-size for :after pseudo elem
    Canvas
        The width and height I pass in as inline styles


    In canvas rendering logic
    
    For all arc() operations the x and y coords for the origin point of the arc (the first two
    arguments) need to be equal to half of the base size. The third argument - the radius - needs
    to be expressed in terms of the base size as well. 


*/

export function Rating({ rating, baseSize }) {
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
        const midPoint = baseSize / 2;
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

        // Before drawing anything, clear canvas to be safe
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the main background
        ctx.fillStyle = colors.darkBlue;
        ctx.beginPath();
        ctx.arc(midPoint, midPoint, midPoint, 0, fullRotation);
        ctx.fill();

        // Draw the track for the arc to sit in
        ctx.strokeStyle = colors.blueGrey;
        //ctx.lineWidth = 3;
        ctx.lineWidth = 0.07 * baseSize;
        ctx.lineCap = 'round';
        ctx.beginPath();
        //ctx.arc(midPoint, midPoint, 19, 0, fullRotation);
        ctx.arc(midPoint, midPoint, 0.41 * baseSize, 0, fullRotation);
        ctx.stroke();

        // Draw the arc itself
        ctx.strokeStyle = arcColor;
        ctx.beginPath();
        //ctx.arc(midPoint, midPoint, 19, arcStartOffset, ratingDecimal * fullRotation + arcStartOffset);
        ctx.arc(midPoint, midPoint, 0.41 * baseSize, arcStartOffset, ratingDecimal * fullRotation + arcStartOffset);
        ctx.stroke();
 
    }, [baseSize, rating]);
    return (
        <RatingContainer baseSize={baseSize}>
            <Canvas 
                ref={canvasEl}
                height={`${baseSize}px`}
                width={`${baseSize}px`}
            >
                <Fallback baseSize={baseSize} />
            </Canvas>
            <RatingText baseSize={baseSize}>{rating*10}</RatingText>
        </RatingContainer>
    );
}

Rating.propTypes = {
    rating: PropTypes.number,
    baseSize: PropTypes.number
};

Rating.defaultProps = {
    baseSize: 46
};

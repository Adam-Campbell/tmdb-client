import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const tick1Fade = keyframes`
    0% {
        opacity: 0;
    }
    12.5% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

const tick2Fade = keyframes`
    12.5% {
        opacity: 0;
    }
    25% {
        opacity: 1;
    }
    62.5% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

const tick3Fade = keyframes`
    25% {
        opacity: 0;
    }
    37.5% {
        opacity: 1;
    }
    75% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

const tick4Fade = keyframes`
    37.5% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    87.5% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

const tick5Fade = keyframes`
    50% {
        opacity: 0;
    }
    62.5% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const tick6Fade = keyframes`
    0% {
        opacity: 0.33333;
    }
    12.5% {
        opacity: 0;
    }
    62.5% {
        opacity: 0;
    }
    75% {
        opacity: 1;
    }
    100% {
        opacity: 0.33333;
    }
`;

const tick7Fade = keyframes`
    0% {
        opacity: 0.66666;
    }
    25% {
        opacity: 0;
    }
    75% {
        opacity: 0;
    }
    87.5% {
        opacity: 1;
    }
    100% {
        opacity: 0.66666;
    }
`;

const tick8Fade = keyframes`
    0% {
        opacity: 1;
    }
    37.5% {
        opacity: 0;
    }
    87.5% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Container = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${({ theme, shouldHaveBackground }) => shouldHaveBackground ?  theme.colors.primary : 'none'};
    transform: ${({ scale }) => `scale(${scale})`};
`;

const Tick = styled.div`
    background: ${({ theme }) => theme.colors.white};
    width: 6px;
    height: 6px;
    border-radius: 3px;
    position: absolute;
    left: calc(50% - 3px);
    top: calc(50% - 3px);
    transform-origin: 50% 18px;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    opacity: 0;
`;

const TickOne = styled(Tick)`
    transform: translateY(-15px) rotate(0deg);
    animation-name: ${tick1Fade};
`;

const TickTwo = styled(Tick)`
    transform: translateY(-15px) rotate(45deg);
    animation-name: ${tick2Fade};
`;

const TickThree = styled(Tick)`
    transform: translateY(-15px) rotate(90deg);
    animation-name: ${tick3Fade};
`;

const TickFour = styled(Tick)`
    transform: translateY(-15px) rotate(135deg);
    animation-name: ${tick4Fade};
`;

const TickFive = styled(Tick)`
    transform: translateY(-15px) rotate(180deg);
    animation-name: ${tick5Fade};
`;

const TickSix = styled(Tick)`
    transform: translateY(-15px) rotate(225deg);
    animation-name: ${tick6Fade};
`;

const TickSeven = styled(Tick)`
    transform: translateY(-15px) rotate(270deg);
    animation-name: ${tick7Fade};
`;

const TickEight = styled(Tick)`
    transform: translateY(-15px) rotate(315deg);
    animation-name: ${tick8Fade};
`;


export function LoadingSpinner({
    shouldHaveBackground,
    scale = 1
}) {
    return (
        <Container
            shouldHaveBackground={shouldHaveBackground}
            scale={scale}
        >
            <TickOne />
            <TickTwo />
            <TickThree />
            <TickFour />
            <TickFive />
            <TickSix />
            <TickSeven />
            <TickEight />
        </Container>
    );
}

LoadingSpinner.propTypes = {
    shouldHaveBackground: PropTypes.bool,
    scale: PropTypes.number
}
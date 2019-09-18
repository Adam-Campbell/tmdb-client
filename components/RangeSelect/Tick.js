import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTick = styled.div`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 55px;
    text-align: center;
    position: absolute;
    transform: translateX(-50%);
`;

const Line = styled.span`
    display: block;
    width: 1px;
    height: 6px;
    background: ${({ theme }) => theme.colors.black};
    margin-bottom: 4px;
`;

export default function Tick({ tick, count }) {
    return (
        <StyledTick
            style={{
                left: `${tick.percent}%`, 
                width: `${100 / count}%`
            }}
        >
            <Line />
            {tick.value}
        </StyledTick>
    );
}

Tick.propTypes = {
    tick: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired
};

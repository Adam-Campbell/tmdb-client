import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTick = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    text-align: center;
    position: absolute;
    transform: translateX(-50%);
`;

const Line = styled.span`
    display: block;
    width: 2px;
    height: 10px;
    background: #222;
`;

export default function Tick({ tick, count }) {
    return (
        <StyledTick style={{ left: `${tick.percent}%`, width: `${100 / count}%` }}>
            <Line />
            {tick.value}
        </StyledTick>
    );
}

Tick.propTypes = {

};
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';

const StyledTick = styled.div`
    ${text('body', { fontWeight: 700, fontSize: '0.75rem' })}
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
    background: #222;
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
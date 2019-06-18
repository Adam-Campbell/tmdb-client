import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHandle = styled.div`
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border-radius: 15px;
    z-index: 10;
    background-color: #2C4870;
    cursor: pointer;
    text-align: center;
`;

const HandleLabel = styled.div`
    color: #222;
    font-family: sans-serif;
    font-size: 12px;
    margin-top: -35px;
`;

export default function Handle({ handle: { id, value, percent }, getHandleProps }) {
    return (
        <StyledHandle
            style={{ left: `${percent}%` }}
            {...getHandleProps(id)}
            tabIndex={0}
        >
            <HandleLabel>{value}</HandleLabel>
        </StyledHandle>
    );
}
import React from 'react';
import styled from 'styled-components';
import { useMultiCount } from '../useCount';


const StyledMultiCounter = styled.div`
    background: #ddd;
    border-radius: 3px;
    padding: 20px;
`;

const CounterContainer = styled.div`
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px #222;
    border-radius: 3px;
    display: flex;
    align-items: center;
`;

const CounterText = styled.p`
    font-family: sans-serif;
    color: #222;
`;

const CounterButton = styled.button`
    padding: 5px;
    border-radius: 3px;
    border: none;
    background: #43cbe8;
    color: white;
    font-family: sans-serif;
    margin-left: auto;
`;

export default function MultiCounter({ numberOfCounters }) {

    const { 
        getCount,
        incrementCount
    } = useMultiCount(numberOfCounters);

    return (
        <StyledMultiCounter>
            {Array.from({ length: numberOfCounters }).map((el, index) => (
                <CounterContainer key={index}>
                    <CounterText>The current count is {getCount(index)}</CounterText>
                    <CounterButton
                        onClick={() => incrementCount(index)}
                    >+</CounterButton>
                </CounterContainer>
            ))}
        </StyledMultiCounter>
    );
}
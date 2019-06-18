import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { roundNum } from './utils';

const StyledHandle = styled.span`
    display: flex;
    min-width: 28px;
    padding-left: 5px;
    padding-right: 5px;
    height: 28px;
    border-radius: 14px;
    background: #43cbe8;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    z-index: 10;
    &:focus {
        z-index: 20;
    }
`;

const TouchMarker = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -10px;
    min-width: 32px;
    padding-left: 5px;
    padding-right: 5px;
    height: 32px;
    border-radius: 16px;
    background: #f58a0b;
    position: absolute;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: white;
    transform: translateX(-50%);
`;

/*
    For usability reasons an extra element has to be added during touch interactions only (it allows
    the user to easily see what the current value is since their finger will be covering the primary
    place where the value is listed). To achieve this we intercept the onTouchStart handler provided
    by React-Compound-Slider and create our own handler that calls their handler as well as performing
    additional logic. This event handler, coupled with a touchend handler we add to the window, manage
    the isTouchActive local component state, and this state controls whether the additional element
    is rendered or not.
*/

export default function Handle({ handle: { id, value, percent }, getHandleProps }) {
    const [ isTouchActive, setIsTouchActive ] = useState(false);
    useEffect(() => {
        function handleTouchEnd(e) {
            if (isTouchActive) {
                setIsTouchActive(false);
            }
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('touchend', handleTouchEnd);
            return function cleanup() {
                window.removeEventListener('touchend', handleTouchEnd);
            }
        }
    }, [isTouchActive]);
    
    const { onKeyDown, onMouseDown, onTouchStart } = getHandleProps(id);
    function handleTouchStart(e) {
        e.preventDefault();
        setIsTouchActive(true);
        onTouchStart(e);
    }
    const roundedValue = roundNum(value);
    return (
        <>
            <StyledHandle 
                style={{ left: `${percent}%` }}
                tabIndex="0"
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onTouchStart={handleTouchStart}
                isTouchActive={isTouchActive}
            >
                {roundedValue}
            </StyledHandle>
            {isTouchActive && (
                <TouchMarker
                    style={{ left: `${percent}%` }}
                >
                    {roundedValue}
                </TouchMarker>
            )}
        </>
    );
}

Handle.propTypes = {

};
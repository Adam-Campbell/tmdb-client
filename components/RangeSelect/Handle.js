import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { roundNum } from './utils';
import { text } from '../../utils';
import useHover from '../useHover';

const StyledHandle = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 10;
    &:focus {
        z-index: 20;
        outline: 0;
    }
`;

const HandleInner = styled.span`
    background: #43cbe8;
    width: 16px;
    height: 16px;
    border-radius: 10px;
`;

const Marker = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
    padding-left: 5px;
    padding-right: 5px;
    height: 38px;
    width: 38px;
    border-radius: 50% 50% 50% 0;
    background: #1a435d;
    position: absolute;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: white;
    transform: translateX(-50%) rotate(-45deg);
`;

const MarkerText = styled.span`
    ${text('body', { fontWeight: 700, fontSize: '0.85rem', color: '#fff' })}
    transform: rotate(45deg);
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
    
    const [ isActive, setIsActive ] = useState(false);

    const { isHovered, containerProps } = useHover();

    useEffect(() => {
        function handleInteractionEnd(e) {
            if (isActive) {
                setIsActive(false);
            }
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('touchend', handleInteractionEnd);
            window.addEventListener('mouseup', handleInteractionEnd);
            return function cleanup() {
                window.removeEventListener('touchend', handleInteractionEnd);
                window.removeEventListener('mouseup', handleInteractionEnd)
            }
        }
    }, [isActive]);
    
    const { onKeyDown, onMouseDown, onTouchStart } = getHandleProps(id);
    function handleTouchStart(e) {
        e.preventDefault();
        setIsActive(true);
        onTouchStart(e);
    }
    function handleMouseDown(e) {
        e.preventDefault();
        setIsActive(true);
        onMouseDown(e);
    }
    const roundedValue = roundNum(value);
    return (
        <>
            <StyledHandle 
                style={{ left: `${percent}%` }}
                tabIndex="0"
                onKeyDown={onKeyDown}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                {...containerProps}
            >
                <HandleInner />
            </StyledHandle>
            {(isActive || isHovered) && (
                <Marker
                    style={{ left: `${percent}%` }}
                >
                    <MarkerText>
                        {roundedValue}
                    </MarkerText>
                </Marker>
            )}
        </>
    );
}

Handle.propTypes = {

};
import React, { useEffect, useState } from 'react';
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
    background: ${({ theme }) => theme.colors.primary};
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
    background: ${({ theme }) => theme.colors.complimentary};
    position: absolute;
    transform: translateX(-50%) rotate(-45deg);
`;

const MarkerText = styled.span`
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    transform: rotate(45deg);
`;

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

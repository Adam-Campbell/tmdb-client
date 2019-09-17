import React, { useEffect, useState } from 'react';
import { roundNum } from './utils';
import useHover from '../useHover';
import {
    StyledHandle,
    HandleInner,
    Marker,
    MarkerText
} from './handleElements';

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

import React, { useState } from 'react';

export default function useHover() {
    const [ isHovered, setIsHovered ] = useState(false);

    const containerProps = {
        onMouseEnter: () => {
            setIsHovered(true);
        },
        onMouseLeave: () => {
            setIsHovered(false);
        }
    }

    return {
        isHovered,
        containerProps
    };
}
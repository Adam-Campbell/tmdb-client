import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../useHover';

const StyledInteractionButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 5px;
    background: ${({ isHovered }) => isHovered ? '#fff' : 'none'};
    transition: background ease-out 0.2s;
    cursor: pointer;
`;

export default function InteractionButton({ 
    handleClick, 
    isBeingUsed, 
    inUseColor, 
    tooltipText,
    iconRef, 
    children  
}) {

    const { isHovered, containerProps } = useHover();

    const iconColor = isBeingUsed 
                    ? inUseColor
                    : isHovered
                        ? '#222'
                        : '#fff';

    return (
        <>
            <StyledInteractionButton
                isHovered={isHovered}
                onClick={handleClick}
                data-tip={tooltipText}
                ref={iconRef}
                {...containerProps}
            >
                {children({
                    iconColor
                })}
            </StyledInteractionButton>
        </>
    );
}

InteractionButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isBeingUsed: PropTypes.bool.isRequired,
    inUseColor: PropTypes.string.isRequired,
    tooltipText: PropTypes.string.isRequired,
    iconRef: PropTypes.shape({ 
        current: PropTypes.any
    })
};
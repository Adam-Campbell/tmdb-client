import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../useHover';
import { darken, desaturate } from 'polished';

const StyledButton = styled.button`
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    padding: ${({ theme }) => theme.getSpacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: none;
    background: ${({ theme, buttonType, isHovered }) => {
        return isHovered 
            ? darken( 0.1, desaturate( 0.1, theme.colors[buttonType] ) )
            : theme.colors[buttonType]
    }};
    transition: background ease-out 0.2s;
    cursor: pointer;
`;

export function Button({ 
    onClick, 
    buttonType = 'primary', 
    className, 
    children,
    buttonRef,
    shouldSubmit,
}) {
    const { isHovered, containerProps } = useHover();

    return (
        <StyledButton
            onClick={onClick}
            className={className}
            buttonType={buttonType}
            isHovered={isHovered}
            {...containerProps}
            ref={buttonRef}
            type={shouldSubmit ? 'submit' : 'button'}
        >
            {children}
        </StyledButton>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    buttonType: PropTypes.oneOf(['primary', 'success', 'warning', 'info']),
    className: PropTypes.string,
    children: PropTypes.any,
    buttonRef: PropTypes.object,
    shouldSubmit: PropTypes.bool,
}
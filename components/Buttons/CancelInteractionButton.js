import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../../components/useHover';
import { text } from '../../utils';
import { Times } from 'styled-icons/fa-solid';

const StyledCancelInteractionButton = styled.button`
    display: flex;
    align-items: center;
    padding: 5px;
    background: none;
    border: none;
    ${text('body', { fontSize: '0.85rem', fontWeight: 700 })}
    cursor: pointer;
`;

const IconContainer = styled.span`
    border: solid #dc1f3b 2px;
    border-radius: 50%;
    background: ${({ isHovered }) => isHovered ? '#dc1f3b' : 'none'};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    transition: background ease-out 0.2s;
    margin-right: 5px;
`;

const CancelIcon = styled(Times)`
    color: ${({ isHovered }) => isHovered ? '#fff' : '#dc1f3b'};
    width: 10px;
    transition: color ease-out 0.2s;
`;

export function CancelInteractionButton({ onClick, label }) {

    const { isHovered, containerProps } = useHover();

    return (
        <StyledCancelInteractionButton 
            isHovered={isHovered} 
            onClick={onClick}
            {...containerProps}
        >
            <IconContainer isHovered={isHovered} data-testid="icon-container">
                <CancelIcon isHovered={isHovered} data-testid="icon" />
            </IconContainer>
            {label}
        </StyledCancelInteractionButton>
    );
}

CancelInteractionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}
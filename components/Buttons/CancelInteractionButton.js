import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../../components/useHover';
import { Times } from 'styled-icons/fa-solid';

const StyledCancelInteractionButton = styled.button`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(1)};
    background: none;
    border: none;
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: 0.85rem;
    cursor: pointer;
`;

const IconContainer = styled.span`
    border: solid 2px ${({ theme }) => theme.colors.warning};
    border-radius: 50%;
    background: ${({ isHovered, theme }) => isHovered ? theme.colors.warning : 'none'};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    transition: background ease-out 0.2s;
    margin-right: ${({ theme }) => theme.getSpacing(1)};
`;

const CancelIcon = styled(Times)`
    color: ${({ isHovered, theme }) => isHovered ? theme.colors.white : theme.colors.warning};
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
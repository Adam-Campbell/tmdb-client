import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNavToggleButton = styled.button`
    position: relative;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    z-index: 5000;
    &:focus {
        outline: none;
    }
    @media (min-width: 768px) {
        display: none;
    }
`;

const ToggleBar = styled.span`
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 4px;
    background: ${({ theme }) => theme.colors.white};
    transition: all ease-out 0.3s;
    ${StyledNavToggleButton}:focus & {
        background: ${({ theme, isOpen }) => isOpen ? theme.colors.complimentary : theme.colors.primary};
    }
`;

const TopToggleBar = styled(ToggleBar)`
    transform: ${({ isOpen }) => {
        return isOpen ? 
        'translate(-50%, -50%) rotate(45deg)' : 
        'translate(-50%, -12px) rotate(0deg)';
    }};
`;

const MiddleToggleBar = styled(ToggleBar)`
    transform: ${({ isOpen }) => {
        return isOpen ? 
        'translate(-50%, -50%) rotate(45deg)' : 
        'translate(-50%, -50%) rotate(0deg)';
    }};
`;

const BottomToggleBar = styled(ToggleBar)`
    transform: ${({ isOpen }) => {
        return isOpen ? 
        'translate(-50%, -50%) rotate(-45deg)' : 
        'translate(-50%, 8px) rotate(0deg)';
    }};
`;

export default function NavToggleButton({ isOpen, handleClick }) {
    return (
        <StyledNavToggleButton 
            isOpen={isOpen}
            onClick={handleClick}
        >
            <TopToggleBar isOpen={isOpen} />
            <MiddleToggleBar isOpen={isOpen} />
            <BottomToggleBar isOpen={isOpen} />
        </StyledNavToggleButton>
    );
}

NavToggleButton.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};
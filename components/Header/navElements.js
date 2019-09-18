import styled from 'styled-components';
import { hideVisually } from 'polished';

export const StyledNav = styled.nav`
    background: ${({ theme }) => theme.colors.primary};
    width: 300px;
    height: 100vh;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-300px)'};
    transition: transform ease-out 0.3s;
    padding-top: 50px;
    @media (min-width: 768px) {
        width: auto;
        height: auto;
        background: none;
        transform: translateX(0);
        transition: none;
        padding-top: 0;
    }
`;

export const NavContainer = styled.div`
    background: ${({ theme, isOpen }) => isOpen ? theme.colors.overlayStrong : 'transparent'};
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100vw)'};
    transition: ${({ isOpen }) => isOpen ? 'background 0.3s ease-out' : 'transform 0.01s ease-out 0.3s, background 0.3s ease-out'};
    z-index: 4000;
    height: 100vh;
    width: 100vw;
    @media (min-width: 768px) {
        position: static;
        height: auto;
        width: auto;
        background: none;
        transform: translateX(0);
        transition: none;
    }
`;

export const NavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-height: calc(100vh - 50px);
    overflow-y: auto;
    @media (min-width: 768px) {
        flex-direction: row;
        overflow-y: initial;
    }
`;

export const HiddenLabel = styled.label`
    ${hideVisually()}
`;

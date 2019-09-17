import styled from 'styled-components';
import { KeyboardArrowDown } from 'styled-icons/material';

export const ListBoxContainer = styled.div`
    position: relative;
    flex-grow: 1;
    ${({ inlineLabel }) => !inlineLabel && 'width: 100%;'}
`;

export const OuterContainer = styled.div`
    display: flex;
    flex-direction: ${({ inlineLabel }) => inlineLabel ? 'row' : 'column'};
    align-items: ${({ inlineLabel }) => inlineLabel ? 'center' : 'flex-start'};
`;

export const Label = styled.label`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    margin: ${({ theme, inlineLabel }) => {
        return inlineLabel ? theme.getSpacing(0,2,0,0) : theme.getSpacing(0,0,1,3);
    }};
`;

export const ListBoxMenuToggle = styled.div`
    background: ${({ theme }) => theme.colors.white};
    height: 34px;
    border-radius: 17px;
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    display: flex;
    align-items: center;
    box-shadow: ${({ theme }) => theme.boxShadow};
    cursor: pointer;
    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
    }
`;

export const Text = styled.span`
    padding-left: ${({ theme }) => theme.getSpacing(3)};
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
`;

export const IconPlaceholder = styled.span`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    background: ${({ theme }) => theme.colors.uiPrimary};
    margin-right: 4px;
`;

export const ArrowIcon = styled(KeyboardArrowDown)`
    width: 20px;
    color: ${({ theme }) => theme.colors.black};
    transition: transform ease-out 0.2s;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const Divider = styled.span`
    display: inline-block;
    width: 1px;
    height: 24px;
    background: ${({ theme }) => theme.colors.uiPrimary};
    margin-left: auto;
    margin-right: 8px;
`;

export const Menu = styled.ul`
    position: absolute;
    list-style-type: none;
    padding-left: 0;
    margin-top: 8px;
    margin-bottom: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: ${({ theme, isOpen }) => isOpen ? `solid 1px ${theme.colors.uiPrimary}` : 'none'};
    box-shadow: ${({ theme, isOpen }) => isOpen ? theme.boxShadow : 'none'};
    max-height: ${({ isOpen, maxHeight }) => isOpen ? `${maxHeight}px` : 0};
    overflow: auto;
    z-index: 3000;
    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
    }
`;

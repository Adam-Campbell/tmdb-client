import styled from 'styled-components';
import { Times } from 'styled-icons/fa-solid';

export const StyledComboBox = styled.div`
    position: relative;
    z-index: 1000;
`;

export const Label = styled.label`
    ${({ theme }) => theme.fontStacks.body()}
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 5px;
`;

export const InputRow = styled.div`
    display: flex;
`;

export const InputRowInner = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const Input = styled.input`
    ${({ theme }) => theme.fontStacks.body()}
    padding: 0 10px 0 0;
    height: 35px;
    border: solid 1px transparent;
    border-radius: 25px;
    margin: 4px;
    flex-grow: 1;
    text-indent: 20px;
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

export const SelectedTag = styled.div`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    padding: ${({ theme }) => theme.getSpacing(1)};
    display: inline-flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.uiSecondary};
    border-radius: ${({ theme }) => theme.borderRadius};
    margin: 4px;
`;

export const SelectedTagButton = styled.button`
    background: ${({ theme }) => theme.colors.warning};
    margin-left: 4px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

export const CancelIcon = styled(Times)`
    color: ${({ theme }) => theme.colors.white};
    width: 14px;
`;

export const Menu = styled.ul`
    margin: 0;
    margin-top: 10px;
    list-style-type: none;
    padding-left: 0;
    position: absolute;
    width: 100%;
    border: ${({ theme, isOpen }) => isOpen ? `solid 1px ${theme.colors.uiPrimary}` : 'none'};
    box-shadow: ${({ theme, isOpen }) => isOpen ? theme.boxShadow : 'none'};
    max-height: ${({ isOpen }) => isOpen ? '220px' : 0};
    overflow-y: auto;
    transition: max-height ease-out 0.2s;
`;

export const MenuItem = styled.li`
    ${({ theme }) => theme.fontStacks.body()}
    color: ${({ theme, isActive, isSelected }) => (isActive || isSelected) ? theme.colors.white : theme.colors.black};
    padding: 10px;
    cursor: pointer;
    background: ${({ theme, isActive, isSelected }) => (
        isActive ? theme.colors.primary : 
                   isSelected ? theme.colors.complimentary : 
                                theme.colors.white
    )};
`;

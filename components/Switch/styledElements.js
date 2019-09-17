import styled from 'styled-components';
import { hideVisually } from 'polished';

export const Fieldset = styled.fieldset`
    border: none;
    padding: ${({ theme }) => theme.getSpacing(2, 0)};
`;

export const Legend = styled.legend`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    ${({ shouldHide }) => shouldHide && hideVisually()}
`;

export const RadioButtonsContainer = styled.div`
    width: 100%;
    display: flex;
`;

export const RadioButton = styled.input`
    ${hideVisually()}
`;

export const RadioButtonLabel = styled.label`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    padding: ${({ theme }) => theme.getSpacing(2)};
    background: ${({ theme }) => theme.colors.uiPrimary};
    cursor: pointer;
    transition: background ease-out 0.2s;
    flex-grow: 1;
    text-align: center;
    ${RadioButton}:checked + & {
        background: ${({ theme }) => theme.colors.uiSecondary};
        font-weight: 600;
    }
    &:hover {
        background: #e6e6e6;
    }
    &:first-of-type {
        border-radius: 3px 0 0 3px;
    }
    &:last-of-type {
        border-radius: 0 3px 3px 0;
    }
`;

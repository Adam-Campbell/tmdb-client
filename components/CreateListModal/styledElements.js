import styled from 'styled-components';
import { Times } from 'styled-icons/fa-solid';
import { Button } from '../Buttons';

export const FormTitle = styled.h2`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.md};
    margin: ${({ theme }) => theme.getSpacing(2, 0, 0, 0)};
`;

export const Fieldset = styled.fieldset`
    margin: 0;
    padding: 0;
    border: none;
`;

export const Label = styled.label`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    display: block;
    margin-bottom: ${({ theme }) => theme.getSpacing(1)};
    margin-top: ${({ theme }) => theme.getSpacing(4)};
`;

export const NameInput = styled.input`
    ${({ theme }) => theme.fontStacks.body()}
    border: none;
    background: ${({ theme }) => theme.colors.uiPrimary};
    display: block;
    padding: ${({ theme }) => theme.getSpacing(2, 2, 2, 0)};
    text-indent: ${({ theme }) => theme.getSpacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
`;

export const NameInputError = styled.div`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    padding: ${({ theme }) => theme.getSpacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.colors.warning};
    margin-top: ${({ theme }) => theme.getSpacing(2)};
    display: flex;
    align-items: center;
`;

export const CloseErrorIcon = styled(Times)`
    width: 14px;
    color: ${({ theme }) => theme.colors.white};
    margin-left: auto;
    cursor: pointer;
`;

export const Textarea = styled.textarea`
    ${({ theme }) => theme.fontStacks.body()}
    border: none;
    background: ${({ theme }) => theme.colors.uiPrimary};
    display: block;
    padding: ${({ theme }) => theme.getSpacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    min-height: 80px;
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
`;

export const CancelButton = styled(Button)`
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

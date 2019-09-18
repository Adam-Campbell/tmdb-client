import styled from 'styled-components';
import { hideVisually } from 'polished';

export const RatingsChartContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: ${({ theme }) => theme.getSpacing(2, 0)};
`;

export const ChartTitle = styled.h3`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
    } 
`;

export const Fieldset = styled.fieldset`
    border: none;
    padding: 0;
`;

export const Legend = styled.legend`
    ${hideVisually()}
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
    padding: ${({ theme }) => theme.getSpacing(1)};
    background: ${({ theme }) => theme.colors.uiPrimary};
    border-radius: ${({ theme }) => theme.borderRadius};
    margin-left: 3px;
    margin-right: 3px;
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
        margin-left: 0;
    }
    &:last-of-type {
        margin-right: 0;
    }
`;

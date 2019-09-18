import styled from 'styled-components';
import { Times } from 'styled-icons/fa-solid';

export const LoaderContainer = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 400px) {
        height: 120px;
    }
`;

export const TitleRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 400px) {
        margin-bottom: ${({ theme }) => theme.getSpacing(3)};
    }
`;

export const ModalTitle = styled.h2`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
    margin-top: ${({ theme }) => theme.getSpacing(2)};
    margin-bottom: ${({ theme }) => theme.getSpacing(2)};
`;

export const CancelButton = styled.button`
    border: 0;
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.colors.warning};
    margin-left: auto;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const CancelIcon = styled(Times)`
    color: ${({ theme }) => theme.colors.white};
    width: 14px;
`;

export const List = styled.ul`
    list-style-type: none;
    padding-left: 0;
    max-height: 300px;
    overflow-y: auto;
    margin-top: ${({ theme }) => theme.getSpacing(2)};
`;
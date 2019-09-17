import styled from 'styled-components';
import { Search } from 'styled-icons/material';
import { Row } from '../Layout';

export const SearchBarContainer = styled.div`
    width: 100%;
    border-top: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    border-bottom: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    background: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.boxShadow};
    z-index: 2000;
`;

export const InputRow = styled(Row)`
    display: flex;
    align-items: stretch;
    padding: ${({ theme }) => theme.getSpacing(2, 0)};
`;

export const InputIcon = styled(Search)`
    color: ${({ theme }) => theme.colors.black};
    width: 30px;
    max-height: 30px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;

export const Input = styled.input`
    ${text('body')}
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    font-style: italic;
    flex-grow: 1;
    text-indent: ${({ theme }) => theme.getSpacing(3)};
    border: solid 1px transparent;
    border-radius: 25px;
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

export const Menu = styled.ul`
    position: absolute;
    width: 100%;
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    z-index: 2000;
`;

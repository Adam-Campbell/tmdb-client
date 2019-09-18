import styled from 'styled-components';

export const Table = styled.table`
    table-layout: fixed;
    width: 100%;
    border: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    border-collapse: collapse;
    box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const TableHead = styled.thead`
    background: ${({ theme }) => theme.colors.uiSecondary};
`;

export const TableBody = styled.tbody`
    border: solid 1px ${({ theme }) => theme.colors.uiSecondary};
`;

export const TableHeader = styled.th`
    padding: ${({ theme }) => theme.getSpacing(2)};
    ${({ theme }) => theme.fontStacks.bodyBold()}
`;

export const YearTableHeader = styled(TableHeader)`
    width: 120px;
    @media(min-width: 768px) {
        width: 80px;
    }
    @media(min-width: 900px) {
        width: 120px;
    }
`;

export const TableData = styled.td`
    padding: ${({ theme }) => theme.getSpacing(2)};
    ${({ theme }) => theme.fontStacks.body()}
    ${({ center }) => center && 'text-align: center;'}
    &:first-child {
        border-right: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    }
`;

export const CreditLink = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    text-decoration: none;
    vertical-align: middle;
    &:hover {
        text-decoration: underline;
    }
`;

export const CreditDescription = styled.span`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    margin-left: ${({ theme }) => theme.getSpacing(2)};
    vertical-align: middle;
`;

export const EmptyError = styled.div`
    padding: ${({ theme }) => theme.getSpacing(3)};
    text-align: center;
    ${({ theme }) => theme.fontStacks.bodyBold()}
`;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';

const Table = styled.table`
    table-layout: fixed;
    width: 100%;
    border: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    border-collapse: collapse;
    box-shadow: ${({ theme }) => theme.boxShadow};
`;

const TableHead = styled.thead`
    background: ${({ theme }) => theme.colors.uiSecondary};
`;

const TableBody = styled.tbody`
    border: solid 1px ${({ theme }) => theme.colors.uiSecondary};
`;

const TableHeader = styled.th`
    padding: ${({ theme }) => theme.getSpacing(2)};
    ${({ theme }) => theme.fontStacks.bodyBold()}
`;

const YearTableHeader = styled(TableHeader)`
    width: 120px;
    @media(min-width: 768px) {
        width: 80px;
    }
    @media(min-width: 900px) {
        width: 120px;
    }
`;

const TableData = styled.td`
    padding: ${({ theme }) => theme.getSpacing(2)};
    ${({ theme }) => theme.fontStacks.body()}
    ${({ center }) => center && 'text-align: center;'}
    &:first-child {
        border-right: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    }
`;

const CreditLink = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    text-decoration: none;
    vertical-align: middle;
    &:hover {
        text-decoration: underline;
    }
`;

const CreditDescription = styled.span`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    margin-left: ${({ theme }) => theme.getSpacing(2)};
    vertical-align: middle;
`;

const EmptyError = styled.div`
    padding: ${({ theme }) => theme.getSpacing(3)};
    text-align: center;
    ${({ theme }) => theme.fontStacks.bodyBold()}
`;

export function CreditsTable({ creditsData }) {
    if (!creditsData.length) {
        return (
            <EmptyError>
                Nothing seems to be here!
            </EmptyError>
        );
    }
    return (
        <Table>
            <TableHead>
                <tr>
                    <YearTableHeader fixedWidth scope="col">Release</YearTableHeader>
                    <TableHeader scope="col">Description</TableHeader>
                </tr>
            </TableHead>
            {creditsData.map(yearObject => (
                <TableBody key={yearObject.releaseYear || '-'}>
                    {yearObject.credits.map(credit => (
                        <tr key={credit.creditId}>
                            <TableData center>{credit.releaseYear || '-'}</TableData>
                            <TableData>
                                <CreditLink href="#">{credit.name}</CreditLink>
                                {credit.creditDescription && (
                                    <CreditDescription>{credit.creditDescription}</CreditDescription>
                                )}
                            </TableData>
                        </tr>
                    ))}
                </TableBody>
            ))}
        </Table>
    );
}

CreditsTable.propTypes = {
    creditsData: PropTypes.arrayOf(PropTypes.shape({
        releaseYear: PropTypes.number,
        credits: PropTypes.arrayOf(PropTypes.shape({
            averageRating: PropTypes.number, 
            creditDescription: PropTypes.string,
            creditId: PropTypes.string.isRequired,
            mediaId: PropTypes.number.isRequired,
            mediaType: PropTypes.oneOf([
                'movie',
                'tv'
            ]).isRequired,
            name: PropTypes.string.isRequired,
            releaseYear: PropTypes.number
        }))
    })).isRequired
};

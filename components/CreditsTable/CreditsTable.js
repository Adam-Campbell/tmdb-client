import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';

const Table = styled.table`
    table-layout: fixed;
    width: 100%;
    border: solid 1px #ddd;
    border-collapse: collapse;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const TableHead = styled.thead`
    background: #ddd;
`;

const TableBody = styled.tbody`
    border: solid 1px #ddd;
`;

const TableHeader = styled.th`
    padding: 10px;
    ${text('body', { fontWeight: 700 })}
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
    padding: 10px;
    ${text('body')}
    ${({ center }) => center && 'text-align: center;'}
    &:first-child {
        border-right: solid 1px #ddd;
    }
`;

const CreditLink = styled.a`
    ${text('body', { fontWeight: 700 })}
    text-decoration: none;
    vertical-align: middle;
    &:hover {
        text-decoration: underline;
    }
`;

const CreditDescription = styled.span`
    ${text('body', { fontWeight: 300, fontSize: '0.85rem' })}
    margin-left: 10px;
    vertical-align: middle;
`;

const EmptyError = styled.div`
    padding: 20px;
    text-align: center;
    ${text('body', { fontWeight: 700 })}
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

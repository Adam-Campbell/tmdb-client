import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
    Table,
    TableHead,
    TableBody,
    TableHeader,
    YearTableHeader,
    TableData,
    CreditLink,
    CreditDescription,
    EmptyError
} from './styledElements';

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
                                <Link 
                                    href={`${credit.mediaType === 'movie' ? 'movie' : 'show'}/[id]`} 
                                    as={`${credit.mediaType === 'movie' ? 'movie' : 'show'}/${credit.mediaId}`}
                                >
                                    <CreditLink>{credit.name}</CreditLink>
                                </Link>
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

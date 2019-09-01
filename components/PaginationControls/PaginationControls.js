import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageLink from './PageLink';
import { Row } from '../Layout';
import { dataTypes, createPageLinksDataArray } from './utils';

const StyledPaginationControls = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Ellipses = styled.span`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    margin: ${({ theme }) => theme.getSpacing(0, 1)};
    display: inline-block;
    align-self: center;
`;

export function PaginationControls({
    currentPage,
    totalPages = 500,
    windowSize = 10,
    pageLinkHref,
    pageLinkAs
}) {

    const dataArray = useMemo(() => {
        return createPageLinksDataArray(currentPage, totalPages, windowSize); 
    }, [ currentPage, totalPages, windowSize ]);

    return (
        <StyledPaginationControls>
            {dataArray.map((el, idx) => el.type === dataTypes.pageLink ? (
                <PageLink
                    key={idx} 
                    href={`${pageLinkHref}?page=${el.pageNumber}`}
                    as={`${pageLinkAs}?page=${el.pageNumber}`}
                    pageNumber={el.pageNumber}
                    isActive={el.pageNumber === currentPage}
                />
            ) : (
                <Ellipses key={idx} data-testid="ellipses">...</Ellipses>
            ))}
        </StyledPaginationControls>
    );
}

PaginationControls.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number,
    windowSize: PropTypes.number,
    pageLinkHref: PropTypes.string.isRequired,
    pageLinkAs: PropTypes.string.isRequired
};
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';

const StyledListViewHeader = styled(Row)`
    display: flex;
    align-items: center;
`;

const HeaderTitle = styled.h1`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.md};
    margin-right: auto;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    margin-bottom: ${({ theme }) => theme.getSpacing(0)};
`;

export const ListViewHeader = ({ title, headingTag = 'h1', children }) => (
    <StyledListViewHeader>
        <HeaderTitle as={headingTag}>{title}</HeaderTitle>
        {children}
    </StyledListViewHeader>
);

ListViewHeader.propTypes = {
    title: PropTypes.string.isRequired,
    headingTag: PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
    ])
};
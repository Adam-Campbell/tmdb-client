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
    ${({ theme }) => theme.fontSizes.heading.sm};
    margin-right: auto;
`;

export const ListViewHeader = ({ title, children }) => (
    <StyledListViewHeader>
        <HeaderTitle>{title}</HeaderTitle>
        {children}
    </StyledListViewHeader>
);

ListViewHeader.propTypes = {
    title: PropTypes.string.isRequired
};
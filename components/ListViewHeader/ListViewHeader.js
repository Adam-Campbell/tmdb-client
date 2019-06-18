import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';

const StyledListViewHeader = styled(Row)`
    display: flex;
    align-items: center;
`;

const HeaderTitle = styled.h1`
    font-family: sans-serif;
    font-weight: 700;
    color: #222;
    font-size: 1.25rem;
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
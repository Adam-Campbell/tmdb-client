import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';

const StyledSidebarEntry = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    strong {
        font-weight: 600;
        line-height: 1.6
    }
`;

export function SidebarEntry({ title, value }) {
    if (value === null || value === undefined || value === '') {
        return null;
    }
    return (
        <StyledSidebarEntry>
            <strong>{title}</strong>
            <br/>
            {value}
        </StyledSidebarEntry>
    );
}

SidebarEntry.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
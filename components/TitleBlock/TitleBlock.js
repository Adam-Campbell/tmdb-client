import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';

const StyledTitleBlock = styled(Row)`
    display: flex;
    align-items: center;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
`;

const Title = styled.h1`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.md};
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 0;
`;

export function TitleBlock({ title, headingTag = 'h1', children }) {
    return (
        <StyledTitleBlock>
            <Title as={headingTag}>{title}</Title>
            {children}
        </StyledTitleBlock>
    );
}

TitleBlock.propTypes = {
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

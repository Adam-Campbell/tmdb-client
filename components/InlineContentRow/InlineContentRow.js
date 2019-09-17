import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const StyledInlineContentRow = styled.section`
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
`;

const RowTitle = styled.h3`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.md}
    margin: 0;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SeeMoreLink = styled.a`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    display: inline-block;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export function InlineContentRow({
    title,
    linkText,
    linkDestinationAs,
    linkDestinationHref,
    children
}) {
    return (
        <StyledInlineContentRow>
            <RowTitle>{title}</RowTitle>
            <ContentContainer>
                {children}
            </ContentContainer>
            <Link href={linkDestinationHref} as={linkDestinationAs} passHref>
                <SeeMoreLink>{linkText}</SeeMoreLink>
            </Link>
        </StyledInlineContentRow>
    );
}

InlineContentRow.propTypes = {
    title: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    linkDestinationAs: PropTypes.string.isRequired,
    linkDestinationHref: PropTypes.string.isRequired
};

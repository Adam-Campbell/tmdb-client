import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { text } from '../../utils';

const StyledInlineContentRow = styled.div`
    margin-top: 0;
    margin-bottom: 40px;
`;

const RowTitle = styled.h2`
    ${text('heading')}
    margin-bottom: 0;
    margin-top: 0;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SeeMoreLink = styled.a`
    ${text('body')}
    display: inline-block;
    margin-top: 20px;
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
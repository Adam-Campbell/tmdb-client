import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InlineCard } from '../Cards';
import Link from 'next/link';
import { text } from '../../utils';

const StyledInlineCardRow = styled.div`
    margin-top: 0;
    margin-bottom: 40px;
`;

const RowTitle = styled.h2`
    ${text('heading')}
    margin-bottom: 0;
    margin-top: 0;
`;

const CardsContainer = styled.div`
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

/*

    This will be a dumb presentational component, accepting the following props:

    title
    cardsData
    linkText
    linkDestinationAs
    linkDestinationHref

    The objects in cardsData will be as such:

    {
        id
        name
        imagePath
        urlSubpath
        additionalDetails (can be undefined)
    }

*/

export function InlineCardRow({ 
    title, 
    cardsProps,  
    linkText, 
    linkDestinationAs,
    linkDestinationHref 
}) {
    return (
        <StyledInlineCardRow>
            <RowTitle>{title}</RowTitle>
            <CardsContainer>
                {cardsProps.map(cardProps => (
                    <InlineCard {...cardProps} />
                ))}
            </CardsContainer>
            <Link as={linkDestinationAs} href={linkDestinationHref} passHref>
                <SeeMoreLink>{linkText}</SeeMoreLink>
            </Link>
        </StyledInlineCardRow>
    );
}

InlineCardRow.propTypes = {
    title: PropTypes.string.isRequired,
    cardsProps: PropTypes.arrayOf(PropTypes.object).isRequired,
    linkText: PropTypes.string.isRequired,
    linkDestinationAs: PropTypes.string.isRequired,
    linkDestinationHref: PropTypes.string.isRequired
};
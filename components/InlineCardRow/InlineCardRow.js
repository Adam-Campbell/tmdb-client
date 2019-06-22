import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InlineCard } from '../Cards';
import Link from 'next/link';

/*

    Inline card row needs to render:

    - A title
    - A row of four cards
    - A link to the page where the rest can be viewed. 

*/


const urlSubpaths = {
    movie: '/movie',
    show: '/show',
    person: '/person'
};

const StyledInlineCardRow = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
`;

const RowTitle = styled.h2`
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: #222;
    margin-bottom: 0;
`;

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SeeMoreLink = styled.a`
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #222;
    display: inline-block;
    margin-top: 20px;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

function getCardProps(cardData, cardType) {
    switch (cardType) {
        case 'movie':
            return {
                key: cardData.id,
                id: cardData.id,
                name: cardData.title,
                imagePath: cardData.poster_path,
                urlSubpath: '/movie'
            };
        case 'show':
            return {
                key: cardData.id,
                id: cardData.id,
                name: cardData.name,
                imagePath: cardData.poster_path,
                urlSubpath: '/show' 
            };
        case 'person':
            return {
                key: cardData.id,
                id: cardData.id,
                name: cardData.name,
                imagePath: cardData.profile_path,
                urlSubpath: '/person',
                additionalDetails: cardData.character
            };
        default:
            return null;
    }
}

export function InlineCardRow({ 
    title, 
    cardsData, 
    cardType, 
    linkText, 
    linkDestinationAs,
    linkDestinationHref 
}) {
    return (
        <StyledInlineCardRow>
            <RowTitle>{title}</RowTitle>
            <CardsContainer>
                {cardsData.slice(0,4).map(cardData => (
                    <InlineCard 
                        {...getCardProps(cardData, cardType)}
                    />
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
    cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    cardType: PropTypes.oneOf([
        'movie',
        'show',
        'person'
    ]).isRequired,
    linkText: PropTypes.string.isRequired,
    linkDestinationAs: PropTypes.string.isRequired,
    linkDestinationHref: PropTypes.string.isRequired
};
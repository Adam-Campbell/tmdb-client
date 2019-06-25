import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InlineCard } from '../Cards';
import Link from 'next/link';
import { text } from '../../utils';

const urlSubpaths = {
    movie: '/movie',
    show: '/show',
    person: '/person'
};

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
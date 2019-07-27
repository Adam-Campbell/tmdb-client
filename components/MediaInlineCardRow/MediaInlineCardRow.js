import React from 'react';
import PropTypes from 'prop-types';
import { MinimalCard } from '../Cards';
import InlineContentRow from '../InlineContentRow';

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

export function MediaInlineCardRow({ 
    title, 
    cardsData, 
    cardType,
    linkText,
    linkDestinationAs,
    linkDestinationHref  
}) {
    
    return (
        <InlineContentRow
            title={title}
            linkText={linkText}
            linkDestinationAs={linkDestinationAs}
            linkDestinationHref={linkDestinationHref}
        >
            {cardsData.slice(0,4).map(card => (
                <MinimalCard {...getCardProps(card, cardType)} isInline={true} />
            ))}
        </InlineContentRow>
    );
}

MediaInlineCardRow.propTypes = {
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
}
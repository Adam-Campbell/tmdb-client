import React from 'react';
import PropTypes from 'prop-types';
import InlineCardRow from '../InlineCardRow';

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
    const cardsProps = cardsData.slice(0,4).map(card => getCardProps(card, cardType));
    return (
        <InlineCardRow 
            title={title}
            cardsProps={cardsProps}
            linkText={linkText}
            linkDestinationAs={linkDestinationAs}
            linkDestinationHref={linkDestinationHref}
        />
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
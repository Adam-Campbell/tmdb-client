import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InlineContentRow from '../InlineContentRow';
import { InlineCard } from '../Cards';
import { uniqBy } from 'lodash';

const mediaTypeToSubpathMap = {
    movie: '/movie',
    tv: '/show'
};

export function PersonTopCreditsCardRow({ 
    title, 
    creditsData, 
    linkText,
    linkDestinationAs,
    linkDestinationHref 
}) {
    const cardsProps = uniqBy(creditsData, 'id')
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4)
    .map(credit => ({
        key: credit.id,
        id: credit.id,
        name: credit.title || credit.name,
        imagePath: credit.poster_path,
        urlSubpath: mediaTypeToSubpathMap[credit.media_type]
    }));

    return (
        <InlineContentRow
            title={title}
            linkText={linkText}
            linkDestinationAs={linkDestinationAs}
            linkDestinationHref={linkDestinationHref}
        >
            {cardsProps.map(cardProps => (
                <InlineCard {...cardProps} />
            ))}
        </InlineContentRow>
    );
}

PersonTopCreditsCardRow.propTypes = {
    title: PropTypes.string.isRequired,
    creditsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    linkText: PropTypes.string.isRequired,
    linkDestinationAs: PropTypes.string.isRequired,
    linkDestinationHref: PropTypes.string.isRequired
};
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InlineCardRow from '../InlineCardRow';
import { uniqBy } from 'lodash';

/*

    This takes array of credits and:

    - sorts them by popularity (descending)

    - takes the four most popular

    - maps over them to produce the data formate that InlineCardRow requires

    - renders InlineCardRow with all of the necessary props

*/

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
        <InlineCardRow 
            title={title}
            cardsProps={cardsProps}
            linkText={linkText}
            linkDestinationAs={linkDestinationAs}
            linkDestinationHref={linkDestinationHref}
        />
    );
}

PersonTopCreditsCardRow.propTypes = {
    title: PropTypes.string.isRequired,
    creditsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    linkText: PropTypes.string.isRequired,
    linkDestinationAs: PropTypes.string.isRequired,
    linkDestinationHref: PropTypes.string.isRequired
};
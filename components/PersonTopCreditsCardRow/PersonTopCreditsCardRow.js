import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InlineContentRow from '../InlineContentRow';
import { MinimalCard } from '../Cards';
import { uniqBy } from 'lodash';

/**
 * Takes in a persons full credits data, dedupes them and returns the 4 most popular credits, transformed
 * into objects containing the props required by the component.
 * @param {Array} creditsData - an array of credit objects
 * @returns {Array} - the array of transformed popular credits objects.
 */
function getPropsForPopularCredits(creditsData) {
    return uniqBy(creditsData, 'id')
    .slice(0, 4)
    .map(credit => ({
        key: credit.id,
        id: credit.id,
        name: credit.title || credit.name,
        imagePath: credit.poster_path,
        urlSubpath: credit.media_type === 'movie' ? '/movie' : '/show'
    }));
}

export function PersonTopCreditsCardRow({ 
    title, 
    creditsData, 
    linkText,
    linkDestinationAs,
    linkDestinationHref 
}) {

    const cardsProps = useMemo(() => {
        return getPropsForPopularCredits(creditsData);
    }, [ creditsData ]);

    return (
        <InlineContentRow
            title={title}
            linkText={linkText}
            linkDestinationAs={linkDestinationAs}
            linkDestinationHref={linkDestinationHref}
        >
            {cardsProps.map(cardProps => (
                <MinimalCard {...cardProps} isInline={true} />
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
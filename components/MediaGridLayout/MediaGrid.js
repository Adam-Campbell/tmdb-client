import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageLink from '../ImageLink';
import { ImageSizeConstants, imageSizeConstants } from '../../utils';
import MediaGridItem from './MediaGridItem'

const StyledMediaGrid = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const MediaGridTitle = styled.h2`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.md};
    margin: ${({ theme }) => theme.getSpacing(0, 0, 3, 0)};
`;

function getGridItemProps(rawData, urlSubpath, shouldReverse) {
    const itemsData = rawData.slice(0, 3).map((data, idx) => ({
        key: data.id,
        backdropPath: data.backdrop_path,
        posterPath: data.poster_path,
        name: data.name || data.title,
        linkHref: `${urlSubpath}/[id]`,
        linkAs: `${urlSubpath}/${data.id}`,
        isFullWidth: !idx
    }));
    return shouldReverse ? itemsData.reverse() : itemsData;
}

export default function MediaGrid({ title, data, urlSubpath, shouldReverse }) {

    const [
        gridItemOneProps,
        gridItemTwoProps,
        gridItemThreeProps
    ] = useMemo(() => {
        return getGridItemProps(data, urlSubpath, shouldReverse);
    }, [ data, urlSubpath, shouldReverse ])

    return (
        <>
            <MediaGridTitle>{title}</MediaGridTitle>
            <StyledMediaGrid>
                <MediaGridItem {...gridItemOneProps} />
                <MediaGridItem {...gridItemTwoProps} />
                <MediaGridItem {...gridItemThreeProps} />
            </StyledMediaGrid>
        </>
    );
}

MediaGrid.propTypes = {
    title: PropTypes.string.isRequired, 
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    urlSubpath: PropTypes.string.isRequired,
    shouldReverse: PropTypes.bool.isRequired
};
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { BackdropCard, PosterCard } from '../Cards';
import ListViewHeader from '../ListViewHeader';
import cardViews from './cardViewsConstant';
import ListBox from '../ListBox';


const DropdownContainer = styled.div`
    width: 220px;
    margin-left: auto;
`;

const MediaCardContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const cardViewsData = [
    { value: 'backdrop', name: 'Backdrop' },
    { value: 'poster', name: 'Poster' }
];

export function MediaListView({ title, items, urlSubpath }) {
    const [ cardView, setCardView ] = useState(cardViewsData[0]);
    return (
        <>
            <ListViewHeader title={title}>
                <DropdownContainer>
                    <ListBox 
                        items={cardViewsData}
                        currentValue={cardView}
                        setValue={setCardView}
                        shouldBuffer={false}
                        shouldInlineLabel={true}
                        labelText="Select View: "
                    />
                </DropdownContainer>
            </ListViewHeader>
            <MediaCardContainer>
                {items.map(item => {
                    const cardProps = {
                        key: item.id,
                        id: item.id,
                        title: item.title || item.name,
                        releaseDate: item.release_date || item.first_air_date,
                        averageRating: item.vote_average,
                        backdropPath: item.backdrop_path,
                        posterPath: item.poster_path,
                        overview: item.overview,
                        urlSubpath
                    };
                    return cardView.value === 'backdrop' ? 
                                        <BackdropCard {...cardProps} /> :
                                        <PosterCard {...cardProps} />;
                })}
            </MediaCardContainer>
        </>
    );
}

MediaListView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    urlSubpath: PropTypes.string.isRequired
};

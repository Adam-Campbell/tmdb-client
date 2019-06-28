import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { BackdropCard, PosterCard } from '../Cards';
import ListViewHeader from '../ListViewHeader';
import ViewSelect from './ViewSelect';
import cardViews from './cardViewsConstant';
import ScrollList from '../ScrollList';
import ListBox from '../ListBox';


// const ViewSelect = styled.select`
//     font-family: sans-serif;
//     color: #222;
//     padding: 5px;
//     border: solid 1px #aaa;
//     border-radius: 3px;
//     box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//     font-size: 1rem;
// `;

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

/* 
    <ScrollList 
                        items={cardViewsData}
                        currentValue={cardView}
                        setValue={setCardView}
                    /> 

    <ListBox 
                        items={cardViewsData}
                        currentValue={cardView}
                        setValue={setCardView}
                        shouldBuffer={false}
                    />
    
                    
*/
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

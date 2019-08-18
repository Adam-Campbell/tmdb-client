import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
import ListViewHeader from '../ListViewHeader';

const DropdownContainer = styled.div`
    width: 220px;
    margin-left: auto;
`;

const MediaCardContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
`;

export function MediaListView({ title, items, urlSubpath }) {
    return (
        <>
            <ListViewHeader title={title} />
            <MediaCardContainer>
                <div>
                {items.map(item => (
                    <MediaCard 
                        key={item.id}
                        id={item.id}
                        title={item.title || item.name}
                        releaseDate={item.release_date || item.first_air_date}
                        averageRating={item.vote_average}
                        backdropPath={item.backdrop_path}
                        posterPath={item.poster_path}
                        overview={item.overview}
                        urlSubpath={urlSubpath}
                    />  
                ))}
                </div>
            </MediaCardContainer>
        </>
    );
}

MediaListView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    urlSubpath: PropTypes.string.isRequired
};

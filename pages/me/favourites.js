import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsersFavourites } from '../../reducers/user';
import { fetchFullProfile, markFavourite } from '../../actions';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';
import { Row } from '../../components/Layout';
import { UserMediaCard } from '../../components/Cards';
import { text } from '../../utils';
import { CancelInteractionButton } from '../../components/Buttons';
import ListViewHeader from '../../components/ListViewHeader';
import Switch from '../../components/Switch';

const mediaTypeFilterData = [
    {
        name: 'Movie',
        value: 'movie',
        id: 'view-filter-movie'
    },
    {
        name: 'TV',
        value: 'tv',
        id: 'view-filter-tv'
    }
];

function Favourites(props) {

    const [ mediaType, setMediaType ] = useState('movie');
    const usersFavourites = mediaType === 'movie' ? props.favourites.movies : props.favourites.shows;

    return (
        <>
            <SubNav navData={meRoutesSubNavData} />
            <ListViewHeader title="My Favourites">
                <Switch 
                    groupLabel="Media Type"
                    groupName="media-type"
                    radioButtonsData={mediaTypeFilterData}
                    currentValue={mediaType}
                    handleChange={setMediaType}
                    shouldHideLabel={true}
                />
            </ListViewHeader>
            <Row>
                {usersFavourites.map((entity) => {
                    const isMovie = Boolean(entity.title);
                    return (
                        <UserMediaCard 
                            key={entity.id}
                            id={entity.id}
                            title={isMovie ? entity.title : entity.name}
                            releaseDate={isMovie ? entity.release_date : entity.first_air_date}
                            averageRating={entity.vote_average}
                            posterPath={entity.poster_path}
                            overview={entity.overview}
                            urlSubpath={isMovie ? '/movie' : '/show'}
                        >
                            <CancelInteractionButton 
                                label="Unfavourite"
                                onClick={() => {
                                    props.markFavourite(
                                        isMovie ? 'movie' : 'tv',
                                        entity.id,
                                        false
                                    );
                                }}
                            />
                        </UserMediaCard>
                    );
                })}
            </Row>
        </>
    );
}

Favourites.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

function mapState(state) {
    return {
        favourites: getUsersFavourites(state)
    }
}

export default connect(mapState, { markFavourite })(Favourites);

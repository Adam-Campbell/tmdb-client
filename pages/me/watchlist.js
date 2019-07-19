import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile, editWatchlist } from '../../actions';
import { getUsersWatchlists } from '../../reducers/user';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';
import { Row } from '../../components/Layout';
import { UserMediaCard } from '../../components/Cards';
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

function Watchlist(props) {

    const [ mediaType, setMediaType ] = useState('movie');
    const usersWatchlists = mediaType === 'movie' ? props.watchlists.movies : props.watchlists.shows;
    //const usersWatchlists = [ ...props.watchlists.movies, ...props.watchlists.shows ];

    return (
        <>
            <SubNav navData={meRoutesSubNavData} />
            <ListViewHeader title="My Watchlists">
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
                {usersWatchlists.map(entity => {
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
                                label="Remove from watchlist"
                                onClick={() => {
                                    props.editWatchlist(
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

Watchlist.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

function mapState(state) {
    return {
        watchlists: getUsersWatchlists(state)
    }
}

// editWatchlist = (mediaType, mediaId, isAdding)

export default connect(mapState, { editWatchlist })(Watchlist);
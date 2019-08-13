import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile, editWatchlist } from '../../actions';
import { getUsersWatchlists } from '../../reducers/user';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData, mediaTypeFilterData } from './';
import { Row } from '../../components/Layout';
import { MediaCard } from '../../components/Cards';
import { CancelInteractionButton } from '../../components/Buttons';
import ListViewHeader from '../../components/ListViewHeader';
import Switch from '../../components/Switch';
import UserHeader from '../../components/UserHeader';
import { getInitialMeProps } from './';

function Watchlist(props) {

    const [ mediaType, setMediaType ] = useState('movie');
    const usersWatchlists = mediaType === 'movie' ? props.watchlists.movies : props.watchlists.shows;

    return (
        <>
            <UserHeader />
            <SubNav navData={meRoutesSubNavData} alignLeft={true} />
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
                        <MediaCard 
                            key={entity.id}
                            id={entity.id}
                            title={entity.title || entity.name}
                            releaseDate={entity.release_date || entity.first_air_date}
                            averageRating={entity.vote_average}
                            posterPath={entity.poster_path}
                            backdropPath={entity.backdrop_path}
                            overview={entity.overview}
                            urlSubpath={isMovie ? '/movie' : '/show'}
                            hasUserAction={true}
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
                        </MediaCard>
                    );
                })}
            </Row>
        </>
    );
}

Watchlist.getInitialProps = getInitialMeProps;

function mapState(state) {
    return {
        watchlists: getUsersWatchlists(state)
    }
}

export default connect(mapState, { editWatchlist })(Watchlist);

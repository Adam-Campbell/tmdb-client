import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import { getUsersRatings } from '../../reducers/user';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';
import UserHeader from '../../components/UserHeader';
import { UserMediaCard } from '../../components/Cards';
import { Row } from '../../components/Layout';
import { CardRatingButton } from '../../components/Buttons';
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

function Ratings(props) {

    const [ mediaType, setMediaType ] = useState('movie');

    const usersRatings = mediaType === 'movie' ? props.ratings.movies : props.ratings.shows;


    return (
        <>
            {/*<UserHeader />*/}
            <SubNav navData={meRoutesSubNavData} />
            <ListViewHeader title="My Ratings">
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
                {usersRatings.map(entity => {
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
                            <CardRatingButton 
                                userRating={entity.rating}
                                mediaType={isMovie ? 'movie' : 'tv'}
                                id={entity.id}
                            />
                        </UserMediaCard>
                    );
                })}
            </Row>
        </>
    );
}

Ratings.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

function mapState(state) {
    return {
        ratings: getUsersRatings(state)
    }
}

export default connect(mapState)(Ratings);
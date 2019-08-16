import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import { getUsersRatings } from '../../reducers/user';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData, mediaTypeFilterData } from './';
import UserHeader from '../../components/UserHeader';
import { MediaCard } from '../../components/Cards';
import { Row } from '../../components/Layout';
import { CardRatingButton } from '../../components/Buttons';
import ListViewHeader from '../../components/ListViewHeader';
import Switch from '../../components/Switch';
import { getInitialMeProps } from './';

function Ratings(props) {

    const [ mediaType, setMediaType ] = useState('movie');
    const usersRatings = mediaType === 'movie' ? props.ratings.movies : props.ratings.shows;

    return (
        <>
            <UserHeader />
            <SubNav navData={meRoutesSubNavData} alignLeft={true} />
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
                            <CardRatingButton 
                                userRating={entity.rating}
                                mediaType={isMovie ? 'movie' : 'tv'}
                                id={entity.id}
                            />
                        </MediaCard>
                    );
                })}
            </Row>
        </>
    );
}

Ratings.getInitialProps = getInitialMeProps;

function mapState(state) {
    return {
        ratings: getUsersRatings(state)
    }
}

export default connect(mapState)(Ratings);
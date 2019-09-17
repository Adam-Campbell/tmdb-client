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
import TitleBlock from '../../components/TitleBlock';
import Switch from '../../components/Switch';
import { getInitialMeProps } from './';
import withErrorHandling from '../../components/withErrorHandling';
import { NextSeo } from 'next-seo';

function Ratings(props) {

    const [ mediaType, setMediaType ] = useState('movie');
    const isMovie = mediaType === 'movie';
    const usersRatings = isMovie ? props.ratings.movies : props.ratings.shows;

    return (
        <>
            <NextSeo 
                title="Me - Ratings"
                description="Movies and TV shows that you have rated."
            />
            <UserHeader />
            <SubNav 
                navData={meRoutesSubNavData} 
                navLabel="Navigation links for pages related to your account"
            />
            <section>
                <TitleBlock title="My Ratings">
                    <Switch 
                        groupLabel="Media Type"
                        groupName="media-type"
                        radioButtonsData={mediaTypeFilterData}
                        currentValue={mediaType}
                        handleChange={setMediaType}
                        shouldHideLabel={true}
                    />
                </TitleBlock>
                <Row>
                    {usersRatings.map(entity => {
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
                                    isMovie={isMovie}
                                    id={entity.id}
                                />
                            </MediaCard>
                        );
                    })}
                </Row>
            </section>
        </>
    );
}

function mapState(state) {
    return {
        ratings: getUsersRatings(state)
    }
}

const RatingsPage = withErrorHandling(
    connect(mapState)(Ratings)
);

RatingsPage.getInitialProps = getInitialMeProps;

export default RatingsPage;

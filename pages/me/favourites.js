import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsersFavourites } from '../../reducers/user';
import { fetchFullProfile, markFavourite } from '../../actions';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData, mediaTypeFilterData } from './';
import { Row } from '../../components/Layout';
import { MediaCard } from '../../components/Cards';
import { text } from '../../utils';
import { CancelInteractionButton } from '../../components/Buttons';
import TitleBlock from '../../components/TitleBlock';
import Switch from '../../components/Switch';
import UserHeader from '../../components/UserHeader';
import { getInitialMeProps } from './';
import withErrorHandling from '../../components/withErrorHandling';
import { NextSeo } from 'next-seo';

function Favourites(props) {

    const [ mediaType, setMediaType ] = useState('movie');
    const isMovie = mediaType === 'movie';
    const usersFavourites = isMovie ? props.favourites.movies : props.favourites.shows;

    return (
        <>
            <NextSeo 
                title="Me - Favourites"
                description="Your favourite movies and TV shows."
            />
            <UserHeader />
            <SubNav 
                navData={meRoutesSubNavData} 
                navLabel="Navigation links for pages related to your account"
            />
            <section>
                <TitleBlock title="My Favourites">
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
                    {usersFavourites.map((entity) => {
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
                                    label="Unfavourite"
                                    onClick={() => {
                                        props.markFavourite(
                                            mediaType,
                                            entity.id,
                                            false
                                        );
                                    }}
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
        favourites: getUsersFavourites(state)
    }
}

const FavouritesPage = withErrorHandling(
    connect(mapState, { markFavourite })(Favourites)
);

FavouritesPage.getInitialProps = getInitialMeProps;

export default FavouritesPage;

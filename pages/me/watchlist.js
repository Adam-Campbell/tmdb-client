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
import TitleBlock from '../../components/TitleBlock';
import Switch from '../../components/Switch';
import UserHeader from '../../components/UserHeader';
import { getInitialMeProps } from './';
import withErrorHandling from '../../components/withErrorHandling';
import { NextSeo } from 'next-seo';

const NoMediaMessage = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
`;

function Watchlist(props) {

    const [ mediaType, setMediaType ] = useState('movie');
    const isMovie = mediaType === 'movie';
    const usersWatchlists = isMovie ? props.watchlists.movies : props.watchlists.shows;

    return (
        <>
            <NextSeo 
                title="Me - Watchlist"
                description="Movies and TV shows that you have added to your watchlist."
            />
            <UserHeader />
            <SubNav 
                navData={meRoutesSubNavData} 
                navLabel="Navigation links for pages related to your account"
            />
            <section>
                <TitleBlock title="My Watchlists">
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
                    {Boolean(usersWatchlists.length) ? usersWatchlists.map(entity => {
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
                                            mediaType,
                                            entity.id,
                                            false
                                        );
                                    }}
                                />
                            </MediaCard>
                        );
                    }) : (
                        <NoMediaMessage>
                            There are no {isMovie ? 'movies' : 'TV shows'} to show here.
                        </NoMediaMessage>
                    )}
                </Row>
            </section>
        </>
    );
}

function mapState(state) {
    return {
        watchlists: getUsersWatchlists(state)
    }
}

const WatchlistPage = withErrorHandling(
    connect(mapState, { editWatchlist })(Watchlist)
);

WatchlistPage.getInitialProps = getInitialMeProps;

export default WatchlistPage;

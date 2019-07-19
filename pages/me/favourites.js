import React from 'react';
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


function Favourites(props) {

    const userFavourites = [ ...props.favourites.movies, ...props.favourites.shows ];

    return (
        <>
            <SubNav navData={meRoutesSubNavData} />
            <h1>This is the favourites page</h1>
            <Row>
                {userFavourites.map((entity) => {
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

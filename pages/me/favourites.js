import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsersFavourites } from '../../reducers/user';
import { fetchFullProfile, markFavourite } from '../../actions';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';
import { Row } from '../../components/Layout';
import { UserMediaCard } from '../../components/Cards';
import { Times } from 'styled-icons/fa-solid';


const UnfavouriteButton = styled.button`
    border: solid #222 2px;
    border-radius: 50%;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
`;

const UnfavouriteIcon = styled(Times)`
    color: #222;
    width: 15px;
`;

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
                            <UnfavouriteButton
                                onClick={() => {
                                    props.markFavourite(
                                        isMovie ? 'movie' : 'tv',
                                        entity.id,
                                        false
                                    );
                                }}
                            >
                                <UnfavouriteIcon />
                            </UnfavouriteButton>
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

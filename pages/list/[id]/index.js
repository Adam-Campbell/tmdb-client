import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
    fetchList,
    clearList,
    deleteList,
    removeMovieFromList 
} from '../../../actions';
import { getListData } from '../../../reducers/listReducer';
import { getSessionType } from '../../../reducers/sessionReducer';
import { getUserSummary } from '../../../reducers/user';
import { Row } from '../../../components/Layout';
import { MediaCard } from '../../../components/Cards';
import ListViewHeader from '../../../components/ListViewHeader';
import { text } from '../../../utils';
import Router from 'next/router';
import { CancelInteractionButton, Button } from '../../../components/Buttons';
import ListHeader from '../../../components/ListHeader';


const DeleteListButton = styled(Button)`
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

function List({
    createdBy,
    description,
    items, 
    itemCount,
    name,
    posterPath,
    id,
    isOwner,
    clearList,
    deleteList,
    removeMovieFromList
}) {
    return (
        <div>
            <ListHeader 
                name={name}
                createdBy={createdBy}
                description={description}
                backdropPath={items.length ? items[0].backdrop_path : ''}
            />
            <ListViewHeader title={name}>
                {isOwner && (
                    <>
                        <Button
                            onClick={() => clearList(id)}
                            buttonType="info"
                        >Clear List</Button>
                        <DeleteListButton
                            onClick={() => {
                                deleteList(id);
                                Router.push('/me/lists');
                            }}
                            buttonType="warning"
                        >Delete List</DeleteListButton>
                    </>
                )}
            </ListViewHeader>
            <Row>
                {items.map(item => (
                    <MediaCard
                        key={item.id}
                        id={item.id}
                        title={item.title || item.name}
                        releaseDate={item.release_date || item.first_air_date}
                        averageRating={item.vote_average}
                        posterPath={item.poster_path}
                        backdropPath={item.backdrop_path}
                        overview={item.overview}
                        urlSubpath={item.title ? '/movie' : '/show'}
                        hasUserAction={Boolean(isOwner && item.title)}
                    >
                        {Boolean(isOwner && item.title) && <CancelInteractionButton 
                            label="Remove from list"
                            onClick={() => {
                                removeMovieFromList(id, item.id);
                            }}
                        />}
                    </MediaCard>
                ))}
            </Row>
        </div>
    );
}

List.getInitialProps = async ({ query, store }) => {
    const id = parseInt(query.id);
    await store.dispatch(fetchList(id))
    return {};
}

function mapState(state) {
    const l = getListData(state);
    const user = getUserSummary(state);
    const isLoggedIn = getSessionType(state) === 'USER';
    const isOwner = isLoggedIn && (user.username || user.name) === l.created_by;
    return {
        createdBy: l.created_by,
        description: l.description,
        items: l.items,
        itemCount: l.itemCount,
        name: l.name,
        posterPath: l.poster_path,
        id: parseInt(l.id),
        isOwner,
    };
}

export default connect(mapState, { 
    clearList, 
    deleteList,
    removeMovieFromList 
})(List);
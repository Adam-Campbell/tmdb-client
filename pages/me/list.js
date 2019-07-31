import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
    fetchFullProfile, 
    fetchList,
    clearList,
    deleteList,
    removeMovieFromList 
} from '../../actions';
import { getListData } from '../../reducers/listReducer';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';
import UserHeader from '../../components/UserHeader';
import { Row } from '../../components/Layout';
import { MediaCard } from '../../components/Cards';
import ListViewHeader from '../../components/ListViewHeader';
import { text } from '../../utils';
import Router from 'next/router';
import { CancelInteractionButton } from '../../components/Buttons';


const ClearListButton = styled.button`
    ${text('body', { fontWeight: 700, color: '#fff' })}
    background: #6ee843;
    padding: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

const DeleteListButton = styled(ClearListButton)`
    background: #dc1f3b;
    margin-left: 10px;
`;

function List({
    createdBy,
    description,
    items, 
    itemCount,
    name,
    posterPath,
    id,
    clearList,
    deleteList,
    removeMovieFromList
}) {
    return (
        <div>
            <UserHeader />
            <SubNav navData={meRoutesSubNavData} alignLeft={true} />
            <ListViewHeader title={name}>
                <ClearListButton
                    onClick={() => clearList(id)}
                >Clear List</ClearListButton>
                <DeleteListButton
                    onClick={() => {
                        deleteList(id);
                        Router.push('/me/lists');
                    }}
                >Delete List</DeleteListButton>
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
                        hasUserAction={true}
                    >
                        <CancelInteractionButton 
                            label="Remove from list"
                            onClick={() => {
                                removeMovieFromList(id, item.id);
                            }}
                        />
                    </MediaCard>
                ))}
            </Row>
        </div>
    );
}

List.getInitialProps = async ({ query, store }) => {
    const id = parseInt(query.id);
    await Promise.all([
        store.dispatch(fetchFullProfile()),
        store.dispatch(fetchList(id))
    ]);
    return {};
}

function mapState(state) {
    const l = getListData(state);
    return {
        createdBy: l.created_by,
        description: l.description,
        items: l.items,
        itemCount: l.itemCount,
        name: l.name,
        posterPath: l.poster_path,
        id: parseInt(l.id)
    };
}

export default connect(mapState, { 
    clearList, 
    deleteList,
    removeMovieFromList 
})(List);
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsersCreatedLists } from '../../reducers/user';
import { fetchFullProfile } from '../../actions';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';
import UserHeader from '../../components/UserHeader';
import { Row } from '../../components/Layout';
import { ListCard } from '../../components/Cards';
import ListViewHeader from '../../components/ListViewHeader';
import { text } from '../../utils';
import CreateListModal from '../../components/CreateListModal';

const ListCardsContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const CreateListButton = styled.button`
    ${text('body', { fontWeight: 700, color: '#fff' })}
    background: #6ee843;
    padding: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

function Lists({ lists }) {

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    return (
        <div>
            <UserHeader />
            <SubNav navData={meRoutesSubNavData} alignLeft={true} />
            <ListViewHeader title="My Lists">
                <CreateListButton 
                    onClick={() => setModalIsOpen(true)}
                >
                    Create list
                </CreateListButton>
            </ListViewHeader>
            <ListCardsContainer>
                {lists.map(list => (
                    <ListCard 
                        key={list.id}
                        listId={list.id}
                        imagePath={list.poster_path}
                        name={list.name}
                        itemCount={list.item_count}
                    />
                ))}
            </ListCardsContainer>
            {modalIsOpen && (
                <CreateListModal 
                    isOpen={modalIsOpen}
                    handleClose={() => setModalIsOpen(false)}
                />
            )}
        </div>
    );
}

Lists.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

function mapState(state) {
    return {
        lists: getUsersCreatedLists(state)
    };
}

export default connect(mapState)(Lists);
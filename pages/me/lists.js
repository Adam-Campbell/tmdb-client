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
import TitleBlock from '../../components/TitleBlock';
import { text } from '../../utils';
import CreateListModal from '../../components/CreateListModal';
import { Button } from '../../components/Buttons';
import { getInitialMeProps } from './';
import withErrorHandling from '../../components/withErrorHandling';
import { NextSeo } from 'next-seo';

const ListCardsContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

function Lists({ lists }) {

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    return (
        <>
            <NextSeo 
                title="Me - Lists"
                description="A page containing the lists that you have created."
            />
            <UserHeader />
            <SubNav 
                navData={meRoutesSubNavData} 
                navLabel="Navigation links for pages related to your account" 
            />
            <section>
                <TitleBlock title="My Lists">
                    <Button 
                        onClick={() => setModalIsOpen(true)}
                        buttonType="success"
                    >
                        Create list
                    </Button>
                </TitleBlock>
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
            </section>
            <CreateListModal 
                isOpen={modalIsOpen}
                handleClose={() => setModalIsOpen(false)}
            />
        </>
    );
}

function mapState(state) {
    return {
        lists: getUsersCreatedLists(state)
    };
}

const ListsPage = withErrorHandling(
    connect(mapState)(Lists)
);

ListsPage.getInitialProps = getInitialMeProps;

export default ListsPage;

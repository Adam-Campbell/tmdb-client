import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { addMovieToList } from '../../actions';
import { getCreatedLists } from '../../Api';
import { getUserId } from '../../reducers/user';
import { getUserSessionId } from '../../reducers/sessionReducer';
import { text } from '../../utils';

const LoaderContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loader = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background: #ddd;
`;

const ModalContent = styled.div`

`;

const ModalTitle = styled.h2`
    ${text('heading')}
`;

const List = styled.ul`
    list-style-type: none;
    padding-left: 0;
`;

const ListItem = styled.li`

`;

const ListItemText = styled.p`
    ${text('body')}
    margin-top: 0;
    margin-bottom: 0;
`;


function AddToListModal({ accountId, userSessionId, addMovieToList, isOpen, handleClose }) {

    const [ usersLists, setUsersLists ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        async function fetchCreatedLists() {
            setIsLoading(true);
            const response = await getCreatedLists(accountId, userSessionId);
            console.log(response.data.results);
            setIsLoading(false);
            setUsersLists(response.data.results);
        }
        fetchCreatedLists();
    }, [ accountId, userSessionId ]);

    return (
        <ReactModal
            isOpen={isOpen}
            overlayClassName="centered-modal__overlay"
            className="add-to-list-modal__content-container"
            shouldCloseOnEscape={true}
            onRequestClose={handleClose}
        >
            {isLoading ? (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            ) : (
                <ModalContent>
                    <ModalTitle>Choose a list:</ModalTitle>
                    <List>
                        {usersLists.map(list => (
                            <ListItem key={list.id}>
                                <ListItemText>{list.name}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </ModalContent>
            )}
        </ReactModal>
    );
}

function mapState(state) {
    return {
        userSessionId: getUserSessionId(state),
        accountId: getUserId(state)
    };
}

export const ConnectedAddToListModal = connect(mapState, { addMovieToList })(AddToListModal);
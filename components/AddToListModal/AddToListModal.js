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
import useHover from '../useHover';
import { Times } from 'styled-icons/fa-solid';
import ModalListItem from './ModalListItem';

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

const TitleRow = styled.div`
    display: flex;
    align-items: center;
`;

const ModalTitle = styled.h2`
    ${text('heading')}
    margin-top: 10px;
    margin-bottom: 10px;
`;

const CancelButton = styled.button`
    border: 0;
    border-radius: 3px;
    background: #dc1f3b;
    margin-left: auto;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const CancelIcon = styled(Times)`
    color: #fff;
    width: 14px;
`;

const List = styled.ul`
    list-style-type: none;
    padding-left: 0;
    max-height: 300px;
    overflow-y: auto;
    margin-top: 10px;
`;


function AddToListModal({ 
    accountId, 
    userSessionId, 
    addMovieToList, 
    movieId, 
    isOpen, 
    handleClose 
}) {

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
                <>
                    <TitleRow>
                        <ModalTitle>Choose a list:</ModalTitle>
                        <CancelButton onClick={handleClose}>
                            <CancelIcon />
                        </CancelButton>
                    </TitleRow>
                    <List>
                        {usersLists.map(list => (
                            <ModalListItem 
                                key={list.id}
                                name={list.name}
                                handleClick={() => {
                                    addMovieToList(list.id, movieId);
                                    handleClose();
                                }}
                            />     
                        ))}
                    </List>
                </>
            )}
        </ReactModal>
    );
}

AddToListModal.propTypes = {
    movieId: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

function mapState(state) {
    return {
        userSessionId: getUserSessionId(state),
        accountId: getUserId(state)
    };
}

export const ConnectedAddToListModal = connect(mapState, { addMovieToList })(AddToListModal);

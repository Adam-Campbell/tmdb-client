import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { addMovieToList } from '../../actions';
import { getUserId } from '../../reducers/user';
import ModalListItem from './ModalListItem';
import ListBox from '../ListBox';
import { a } from '../../axiosClient';
import LoadingSpinner from '../LoadingSpinner';
import {
    LoaderContainer,
    TitleRow,
    ModalTitle,
    CancelButton,
    CancelIcon,
    List
} from './styledElements';

function formatListsData(listsData) {
    return listsData.map(list => ({
        name: list.name, 
        value: list.name.toLowerCase().replace(' ', '_'),
        id: list.id
    }));
}

function AddToListModal({ 
    accountId, 
    addMovieToList, 
    movieId, 
    isOpen, 
    handleClose 
}) {

    const [ usersLists, setUsersLists ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
        async function fetchCreatedLists() {
            setIsLoading(true);
            const response = await a.get(`api/user/${accountId}/lists`);
            if (isMounted.current) {
                setIsLoading(false);
                setUsersLists(formatListsData(response.data));
            }
        }
        fetchCreatedLists();
    }, [ accountId ]);

    function handleListSelect(listObject) {
        addMovieToList(listObject.id, movieId);
        isMounted.current = false;
        handleClose();
    }

    return (
        <ReactModal
            isOpen={isOpen}
            overlayClassName={{
                base: 'centered-modal__overlay',
                afterOpen: 'centered-modal__overlay--after-open',
                beforeClose: 'centered-modal__overlay--before-close'
            }}
            className={{
                base: 'add-to-list-modal__content-container',
                afterOpen: 'add-to-list-modal__content-container--after-open',
                beforeClose: 'add-to-list-modal__content-container--before-close'
            }}
            closeTimeoutMS={200}
            shouldCloseOnEscape={true}
            onRequestClose={() => {
                isMounted.current = false;
                handleClose();
            }}
        >
            {isLoading ? (
                <LoaderContainer>
                    <LoadingSpinner 
                        shouldHaveBackground={true}
                    />
                </LoaderContainer>
            ) : (
                <>
                    <TitleRow>
                        <ModalTitle>Add to list</ModalTitle>
                        <CancelButton onClick={handleClose}>
                            <CancelIcon />
                        </CancelButton>
                    </TitleRow>
                    <ListBox 
                        items={usersLists}
                        currentValue={{}}
                        setValue={setUsersLists}
                        labelText="Select a list"
                        onChange={handleListSelect}
                        placeholder="No list selected"
                        maxHeight={280}
                    />
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
        accountId: getUserId(state)
    };
}

export const ConnectedAddToListModal = connect(mapState, { addMovieToList })(AddToListModal);

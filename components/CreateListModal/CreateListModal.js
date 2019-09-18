import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createList } from '../../actions';
import { Button } from '../Buttons';
import {
    FormTitle,
    Fieldset,
    Label,
    NameInput,
    NameInputError,
    CloseErrorIcon,
    Textarea,
    CancelButton
} from './styledElements';

function CreateListModal({ isOpen, handleClose, createList }) {

    const [ listName, setListName ] = useState('');
    const [ listNameHasError, setListNameHasError ] = useState(false);
    const [ listDescription, setListDescription ] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!listName) {
            setListNameHasError(true);
            return;
        }
        createList(listName, listDescription);
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
                base: 'create-list-modal__content-container',
                afterOpen: 'create-list-modal__content-container--after-open',
                beforeClose: 'create-list-modal__content-container--before-close'
            }}
            closeTimeoutMS={200}
            shouldCloseOnEscape={true}
            onRequestClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <FormTitle>Create a new list</FormTitle>
                <Fieldset>
                    <Label htmlFor="create-list-name">Name:</Label>
                    <NameInput 
                        type="text"
                        id="create-list-name"
                        value={listName}
                        onChange={e => setListName(e.target.value)}
                    />
                    {listNameHasError && (
                        <NameInputError>
                            You must provide a name for your list!
                            <CloseErrorIcon 
                                onClick={() => setListNameHasError(false)}
                            />
                        </NameInputError>
                    )}
                    <Label htmlFor="create-list-description">Description (optional):</Label>
                    <Textarea 
                        type="text"
                        id="create-list-description"
                        value={listDescription}
                        onChange={e => setListDescription(e.target.value)}
                    />
                </Fieldset>
                <Button 
                    buttonType="success" 
                    shouldSubmit={true}
                >Create list</Button>
                <CancelButton 
                    buttonType="warning" 
                    onClick={handleClose}
                >Cancel</CancelButton>
            </form>
        </ReactModal>
    );
}

export const ConnectedCreateListModal = connect(undefined, { createList })(CreateListModal);

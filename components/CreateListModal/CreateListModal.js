import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createList } from '../../actions';
import { text } from '../../utils';
import { Times } from 'styled-icons/fa-solid';
import { Button } from '../Buttons';

const FormTitle = styled.h2`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.md};
    margin: ${({ theme }) => theme.getSpacing(2, 0, 0, 0)};
`;

const Fieldset = styled.fieldset`
    margin: 0;
    padding: 0;
    border: none;
`;

const Label = styled.label`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    display: block;
    margin-bottom: ${({ theme }) => theme.getSpacing(1)};
    margin-top: ${({ theme }) => theme.getSpacing(4)};
`;

const NameInput = styled.input`
    ${({ theme }) => theme.fontStacks.body()}
    border: none;
    background: ${({ theme }) => theme.colors.uiPrimary};
    display: block;
    padding: ${({ theme }) => theme.getSpacing(2, 2, 2, 0)};
    text-indent: ${({ theme }) => theme.getSpacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
`;

const NameInputError = styled.div`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    padding: ${({ theme }) => theme.getSpacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.colors.warning};
    margin-top: ${({ theme }) => theme.getSpacing(2)};
    display: flex;
    align-items: center;
`;

const CloseErrorIcon = styled(Times)`
    width: 14px;
    color: ${({ theme }) => theme.colors.white};
    margin-left: auto;
    cursor: pointer;
`;

const Textarea = styled.textarea`
    ${({ theme }) => theme.fontStacks.body()}
    border: none;
    background: ${({ theme }) => theme.colors.uiPrimary};
    display: block;
    padding: ${({ theme }) => theme.getSpacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    min-height: 80px;
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
`;

const CancelButton = styled(Button)`
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;


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
            overlayClassName="centered-modal__overlay"
            className="create-list-modal__content-container"
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

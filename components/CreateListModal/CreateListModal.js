import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createList } from '../../actions';
import { text } from '../../utils';
import { Times } from 'styled-icons/fa-solid';

const Form = styled.form`

`;

const FormTitle = styled.h2`
    ${text('heading')}
`;

const Fieldset = styled.fieldset`
    margin: 0;
    padding: 0;
    border: none;
`;

const Label = styled.label`
    ${text('body', { fontWeight: 700 })}
    display: block;
    margin-bottom: 5px;
    margin-top: 40px;
`;

const NameInput = styled.input`
    ${text('body')}
    border: none;
    background: #eee;
    display: block;
    padding: 10px 10px 10px 0;
    text-indent: 10px;
    border-radius: 3px;
    width: 100%;
    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
`;

const NameInputError = styled.div`
    ${text('body', { color: '#fff' })}
    padding: 10px;
    border-radius: 3px;
    background: #dc1f3b;
    margin-top: 10px;
    display: flex;
    align-items: center;
`;

const CloseErrorIcon = styled(Times)`
    width: 14px;
    color: #fff;
    margin-left: auto;
    cursor: pointer;
`;


const Textarea = styled.textarea`
    ${text('body')}
    border: none;
    background: #eee;
    display: block;
    padding: 10px;
    border-radius: 3px;
    width: 100%;
    min-height: 80px;
    margin-bottom: 40px;
    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
`;

const SubmitButton = styled.button`
    ${text('body', { fontWeight: 700, color: '#fff' })}
    background: #6ee843;
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    &:focus {
        outline: 0;
    }
`;

const CancelButton = styled(SubmitButton)`
    background: #dc1f3b;
    margin-left: 10px;
`;


function CreateListModal({ isOpen, handleClose, createList }) {

    const [ listName, setListName ] = useState('');
    const [ listNameHasError, setListNameHasError ] = useState(false);
    const [ listDescription, setListDescription ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!listName) {
            setListNameHasError(true);
            return;
        }

        await createList(listName, listDescription);
        handleClose();
        // console.log(`
        //     name: ${listName}
        //     description: ${listDescription}
        // `);
    }

    return (
        <ReactModal
            isOpen={isOpen}
            overlayClassName="create-list-modal__overlay"
            className="create-list-modal__content-container"
            shouldCloseOnEscape={true}
            onRequestClose={handleClose}
        >
            <Form onSubmit={handleSubmit}>
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
                <SubmitButton type="submit">Create list</SubmitButton>
                <CancelButton type="button" onClick={handleClose}>Cancel</CancelButton>
            </Form>
        </ReactModal>
    );
}

export const ConnectedCreateListModal = connect(undefined, { createList })(CreateListModal);

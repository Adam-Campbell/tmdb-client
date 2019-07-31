import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createList } from '../../actions';



function CreateListModal({ isOpen, handleClose, createList }) {

    const [ listName, setListName ] = useState('');
    const [ listDescription, setListDescription ] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
            name: ${listName}
            description: ${listDescription}
        `);
    }

    return (
        <ReactModal
            isOpen={isOpen}
            overlayClassName="gallery-modal__overlay"
            className="create-list-modal__content-container"
            shouldCloseOnEscape={true}
            onRequestClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor="create-list-name">Name:</label>
                <input 
                    type="text"
                    id="create-list-name"
                    value={listName}
                    onChange={e => setListName(e.target.value)}
                />
                <label htmlFor="create-list-description">Description:</label>
                <input 
                    type="text"
                    id="create-list-description"
                    value={listDescription}
                    onChange={e => setListDescription(e.target.value)}
                />
                <button type="submit">Create list</button>
                <button onClick={handleClose}>Cancel</button>
            </form>
        </ReactModal>
    );
}

export const ConnectedCreateListModal = connect(undefined, { createList })(CreateListModal);

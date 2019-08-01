import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';
import { text } from '../../utils';
import { Times } from 'styled-icons/fa-solid';

/*

    ComboBox will manage its own input state (the value of the actual input element) however the selected
    items will be controlled by a parent. The parent should be as 'dumb' as possible, so any logic for 
    how to update will be contained within ComboBox. From the parent I will simply expose the current
    state and the state update function returned from the useState hook. 



*/

const StyledComboBox = styled.div`
    position: relative;
    z-index: 1000;
`;

const Label = styled.label`
    ${text('body')}
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 5px;
`;

const InputRow = styled.div`
    display: flex;
`;

const InputRowInner = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    border-radius: 3px;
    border: solid 1px #eee;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const Input = styled.input`
    ${text('body')}
    padding: 0 10px 0 0;
    height: 35px;
    border: solid 1px transparent;
    border-radius: 25px;
    margin: 4px;
    flex-grow: 1;
    text-indent: 20px;
    &:focus {
        outline: none;
        border-color: #43cbe8;
    }
`;

const SelectedTag = styled.div`
    ${text('body', { fontSize: '0.85rem' })}
    padding: 10px 5px;
    display: inline-flex;
    align-items: center;
    background: #eee;
    border-radius: 3px;
    margin: 4px;
`;

const SelectedTagButton = styled.button`
    background: #dc1f3b;
    margin-left: 4px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
        outline: none;
    }
`;

const CancelIcon = styled(Times)`
    color: #fff;
    width: 14px;
`;

const Menu = styled.ul`
    margin: 0;
    margin-top: 10px;
    list-style-type: none;
    padding-left: 0;
    position: absolute;
    width: 100%;
    border: ${({ isOpen }) => isOpen ? 'solid 1px #eee' : 'none'};
    box-shadow: ${({ isOpen }) => isOpen ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};
    max-height: ${({ isOpen }) => isOpen ? '220px' : 0};
    overflow-y: auto;
    transition: max-height ease-out 0.2s;
`;

const MenuItem = styled.li`
    ${text('body')}
    color: ${({ isActive, isSelected }) => (isActive || isSelected) ? '#fff' : '#222'};
    padding: 10px;
    cursor: pointer;
    background: ${({ isActive, isSelected }) => (
        isActive ? '#43cbe8' : 
                   isSelected ? '#1a435d' : 
                                '#fff'
    )};
`;

/**
 * When an item is clicked or the enter key is pressed, return a new state with the highlightedIndex
 * from the current state, isOpen explicitly set to true and the inputValue explicitly set to an 
 * empty string.
 * @param {Object} state - the current state 
 * @param {Object} changes - the most recent changes.
 */
function comboBoxStateReducer(state, changes) {
    switch (changes.type) {
        case Downshift.stateChangeTypes.keyDownEnter:
        case Downshift.stateChangeTypes.clickItem:
            return {
                ...changes,
                highlightedIndex: state.highlightedIndex,
                isOpen: true,
                inputValue: '',
            };
        default:
            return changes;
    }
}



/**
 * setSelection will be a function that redirects the page to a new route with the updated query params, it
 * will take the new selection state of the ComboBox as its argument. 
 */
export function ComboBox({ items, currentSelection, setSelection }) {

    const inputEl = useRef(null);

    /**
     * Will be called each time a selection occurs, if the selected item isn't already in currentSelection, 
     * then it gets added to the selection, if it was already there then it gets removed. The current 
     * implementation is naive and assumes that the values in the currentSelection array are simple string
     * values. This will have to be changed later. 
     * 
     * This function is declared within the ComboBox component to gain access to the currentSelection and 
     * setSelection props. As such, it will be redeclared on every render. This probably won't be an issue,
     * but if it is then wrap this function in the useCallback hook to allow the same function reference to
     * be used across all renders.
     * @param {String} selectedItem - the currently selected item 
     * @param {*} downshift - the state and utilities object from downshift
     */
    function handleComboBoxSelection(selectedItem) {
        if (currentSelection.includes(selectedItem)) {
            setSelection(currentSelection.filter(item => item !== selectedItem));
        } else {
            setSelection([ ...currentSelection, selectedItem ]);
        }
    }

    function getRemoveButtonProps({ item, ...props }) {
        return {
            onClick: (e) => {
                e.stopPropagation();
                setSelection(currentSelection.filter(el => item !== el));
            },
            ...props
        };
    }

    function getValidItems(inputValue) {
        return items.filter(item => (
            inputValue === '' ||
            item.name.toLowerCase().includes(inputValue.toLowerCase())
        ));
    }


    return (
        <Downshift
            stateReducer={comboBoxStateReducer}
            onChange={handleComboBoxSelection}
            selectedItem={null}
            itemToString={item => (item ? item.name : '')}
        >
            {({ 
                getRootProps,
                getInputProps,
                getToggleButtonProps,
                getMenuProps,
                getItemProps,
                getLabelProps,
                isOpen,
                inputValue,
                highlightedIndex
            }) => (
                <StyledComboBox {...getRootProps()}>
                    <Label {...getLabelProps()}>Genres: </Label>
                    <InputRow isOpen={isOpen}>
                        <InputRowInner>
                            {currentSelection.map(item => (
                                <SelectedTag key={item.id}>
                                    {item.name}
                                    <SelectedTagButton
                                        {...getRemoveButtonProps({ item })}
                                    >
                                        <CancelIcon />
                                    </SelectedTagButton>
                                </SelectedTag>
                            ))}
                            <Input 
                                {...getInputProps({
                                    ref: inputEl
                                })}
                            />
                        </InputRowInner>
                    </InputRow>
                    <Menu {...getMenuProps({ isOpen })}>
                        {isOpen ? getValidItems(inputValue).map((item, index) => (
                            <MenuItem
                                key={item.id}
                                {...getItemProps({
                                    item,
                                    index,
                                    isActive: highlightedIndex === index,
                                    isSelected: currentSelection.includes(item)
                                })}
                            >
                                {item.name}
                            </MenuItem>
                        )) : null}
                    </Menu>
                </StyledComboBox>
            )}
        </Downshift>
    );
}

ComboBox.propTypes = {
    currentSelection: PropTypes.array.isRequired,
    setSelection: PropTypes.func.isRequired,
    items: PropTypes.array
};
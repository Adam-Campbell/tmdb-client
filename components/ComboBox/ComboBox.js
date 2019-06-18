import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';

/*

    ComboBox will manage its own input state (the value of the actual input element) however the selected
    items will be controlled by a parent. The parent should be as 'dumb' as possible, so any logic for 
    how to update will be contained within ComboBox. From the parent I will simply expose the current
    state and the state update function returned from the useState hook. 



*/

const StyledComboBox = styled.div`
    position: relative;
`;

const InputRow = styled.div`
    display: flex;
    border: solid 1px #222;
    border-radius: 3px;
    ${({ isOpen }) => isOpen && `
        border-bottom: none;
        border-radius: 3px 3px 0 0;
    `}
`;

const InputRowInner = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
`;

const Input = styled.input`
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1rem;
    padding: 10px;
    color: #222;
    border: solid 1px #222;
    border-radius: 3px;
    margin: 4px;
    flex-grow: 1;
    &:focus {
        outline: none;
        border-color: #43cbe8;
    }
`;

const SelectedTag = styled.div`
    padding: 10px 5px;
    display: inline-flex;
    align-items: center;
    background: #ddd;
    border-radius: 3px;
    margin: 4px;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 0.85rem;
    color: #222;
`;

const SelectedTagText = styled.span`

`;

const SelectedTagButton = styled.button`
    border-radius: 3px;
    border: none;
    background: #222;
    color: white;
    text-align: center;
    margin-left: 4px;
`;

const ToggleButton = styled.button`
    font-family: sans-serif;
    font-size: 1rem;
    color: #222;
    background: none;
    border: none;
`;

const Menu = styled.ul`
    margin: 0;
    list-style-type: none;
    padding-left: 0;
    position: absolute;
    width: 100%;
    max-height: 220px;
    overflow-y: auto;
    ${({ isOpen }) => isOpen && `
        border: solid 1px #222;
        border-top: none;
        border-radius: 0 0 3px 3px;
    `}
`;

const MenuItem = styled.li`
    font-family: sans-serif;
    font-weight: ${({ isSelected }) => isSelected ? 700 : 400};
    font-size: 1rem;
    color: #222;
    padding: 10px;
    background: ${({ isActive, isSelected }) => (
        isActive ? '#eee' : 
                   isSelected ? '#ddd' : 
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
                isOpen,
                inputValue,
                highlightedIndex
            }) => (
                <StyledComboBox {...getRootProps()}>
                    <InputRow isOpen={isOpen}>
                        <InputRowInner>
                            {currentSelection.map(item => (
                                <SelectedTag key={item.id}>
                                    <SelectedTagText>{item.name}</SelectedTagText>
                                    <SelectedTagButton
                                        {...getRemoveButtonProps({ item })}
                                    >X</SelectedTagButton>
                                </SelectedTag>
                            ))}
                            <Input 
                                {...getInputProps({
                                    ref: inputEl
                                })}
                            />
                        </InputRowInner>
                        <ToggleButton
                            {...getToggleButtonProps({
                                onClick(e) {
                                    e.stopPropagation();
                                    inputEl.current.focus();
                                }
                            })}
                        >&#9660;</ToggleButton>
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
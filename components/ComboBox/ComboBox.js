import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import {
    StyledComboBox,
    Label,
    InputRow,
    InputRowInner,
    Input,
    SelectedTag,
    SelectedTagButton,
    CancelIcon,
    Menu,
    MenuItem
} from './styledElements';

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
                                    ref: inputEl,
                                    placeholder: 'Filter by genre...'
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

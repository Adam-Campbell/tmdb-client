import React, { useReducer, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    OuterContainer,
    StyledListBox,
    ListItem,
    ListLabel,
    LabelIcon
} from './elements';
import { reducer, actionConstants } from './reducer';
import computeScrollIntoView from 'compute-scroll-into-view';

function noop() {}

/*

items:

[
    { 
        name: 'Popularity Descending', 
        value: 'popularity.desc' 
    }
]

// We'll use value (popularit.desc) for everything except the label and the input text.



*/

export function ListBox({ items, currentValue, setValue, shouldBuffer, onChange = noop }) {
    
    // Initialize reducer state
    const [ state, dispatch ] = useReducer(reducer, {
        isOpen: false,
        localSelected: currentValue,
        searchString: '',
        lastSearchUpdateTimestamp: null
    });

    // Instantiate refs to use for various elements
    const labelEl = useRef(null);
    const listEl = useRef(null);
    const currentItemEl = useRef(null);
    const nextItemEl = useRef(null);
    const prevItemEl = useRef(null);

    // Establish the indexes of the currently selected item as well as the next and previous
    // items, so that refs can be added to these items.
    const currentIndex = items.indexOf(state.localSelected);
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;

    // This effect will scroll the listbox in order to make sure the currently selected
    // item is visible
    useEffect(() => {
        if (!state.isOpen || !currentItemEl.current) return;

        const actions = computeScrollIntoView(currentItemEl.current, {
            scrollMode: 'if-needed',
            block: 'nearest',
            inline: 'start',
        });
        actions.forEach(({ el, top, left }) => {
            el.scrollTop = top;
            el.scrollLeft = left;
        });
    }, [ state ]);

    /**
     * Given an index, determines whether that index should 'own' one of the refs for this render, and
     * if so it returns that ref. 
     * @param {Number} index - the index to check
     * @param {?Object} - either returns the ref object is applicable, or else returns null.
     */
    // function getRef(index) {
    //     switch (index) {
    //         case currentIndex:
    //             return currentItemEl;
    //         case nextIndex:
    //             return nextItemEl;
    //         case prevIndex:
    //             return prevItemEl;
    //         default:
    //             return null;
    //     }
    // }

    const getRef = useCallback(
        index => {
            switch (index) {
                case currentIndex:
                    return currentItemEl;
                case nextIndex:
                    return nextItemEl;
                case prevIndex:
                    return prevItemEl;
                default:
                    return null;
            }
        },
        [currentItemEl, nextItemEl, prevItemEl]
    );

    /**
     * Handles action dispatching and focus management for opening the menu.
     */
    // function openMenu() {
    //     dispatch({
    //         type: actionConstants.OPEN_MENU,
    //         payload: {
    //             localSelected: currentValue
    //         }
    //     });
    //     listEl.current.focus();
    // }

    const openMenu = useCallback(
        () => {
            dispatch({
                type: actionConstants.OPEN_MENU,
                payload: {
                    localSelected: currentValue
                }
            });
            listEl.current.focus();
        },
        [listEl.current, currentValue]
    );

    /**
     * Handles action dispatching and focus management for closing the menu.
     */
    // function closeMenu() {
    //     dispatch({ 
    //         type: actionConstants.CLOSE_MENU,
    //         payload: {
    //             currentValue
    //         }
    //     });
    // }

    const closeMenu = useCallback(
        () => {
            dispatch({ 
                type: actionConstants.CLOSE_MENU,
                payload: {
                    currentValue
                }
            });  
        },
        [currentValue]
    );

    /**
     * Calls either openMenu() or closeMenu() depending on the value of state.isOpen
     */
    // function toggleMenu() {
    //     if (state.isOpen) {
    //         closeMenu();
    //         labelEl.current.focus();

    //     } else {
    //         openMenu();
    //     }
    // }

    const toggleMenu = useCallback(
        () => {
            if (state.isOpen) {
                closeMenu();
                labelEl.current.focus();
    
            } else {
                openMenu();
            }
        },
        [state.isOpen, labelEl.current]
    );

    /**
     * Updates localSelected state to match the value specified by the newSelection argument.
     * @param {String} newSelection - the new selection value
     */
    // function updateLocalSelection(newSelection) {
    //     dispatch({
    //         type: actionConstants.UPDATE_LOCAL_SELECTION,
    //         payload: {
    //             localSelected: newSelection
    //         }
    //     });
    //     if (!shouldBuffer) {
    //         setValue(newSelection);
    //         onChange(newSelection);
    //     }
    // }

    const updateLocalSelection = useCallback(
        (newSelection) => {
            dispatch({
                type: actionConstants.UPDATE_LOCAL_SELECTION,
                payload: {
                    localSelected: newSelection
                }
            });
            if (!shouldBuffer) {
                setValue(newSelection);
                onChange(newSelection);
            } 
        },
        [shouldBuffer, setValue, onChange]
    );

    /**
     * Sets the value externally using the setValue function supplied as a prop, and closes menu.
     * @param {String} selectionValue - the new value to set externally.
     */
    // function confirmSelection(newValue) {
    //     setValue(newValue);
    //     onChange(newValue);
    //     dispatch({
    //         type: actionConstants.CONFIRM_SELECTION,
    //         payload: {
    //             newValue
    //         }
    //     });
    //     labelEl.current.focus();
    // }

    const confirmSelection = useCallback(
        (newValue) => {
            setValue(newValue);
            onChange(newValue);
            dispatch({
                type: actionConstants.CONFIRM_SELECTION,
                payload: {
                    newValue
                }
            });
            labelEl.current.focus();
        },
        [setValue, onChange, labelEl.current]
    );


    // function handleSearchStringUpdate(key) {
    //     // I also need to ensure that key is a SINGLE alphanumeric character, and if not I just 
    //     // return early. For example, hitting the escape key will result in ESC being passed to 
    //     // this function, but I definitely do not want to add that to the search string.
    //     const timestamp = Date.now();
    //     const lKey = key.toLowerCase();
    //     const newSearchString = timestamp - state.lastSearchUpdateTimestamp < 500 ?
    //                             state.searchString + lKey :
    //                             lKey;
    //     const newLocalSelected = items.find(el => el.name.toLowerCase().startsWith(newSearchString)) || 
    //                              state.localSelected; 
    //     dispatch({
    //         type: actionConstants.UPDATE_SEARCH_STRING,
    //         payload: {
    //             searchString: newSearchString,
    //             timestamp,
    //             newLocalSelected,
    //         }
    //     });
    //     if (!shouldBuffer && newLocalSelected !== currentValue) {
    //         setValue(newLocalSelected);
    //         onChange(newLocalSelected);
    //     }
    // }

    const handleSearchStringUpdate = useCallback(
        (key) => {
            const timestamp = Date.now();
            const lKey = key.toLowerCase();
            const newSearchString = timestamp - state.lastSearchUpdateTimestamp < 500 ?
                                    state.searchString + lKey :
                                    lKey;
            const newLocalSelected = items.find(el => el.name.toLowerCase().startsWith(newSearchString)) || 
                                    state.localSelected; 
            dispatch({
                type: actionConstants.UPDATE_SEARCH_STRING,
                payload: {
                    searchString: newSearchString,
                    timestamp,
                    newLocalSelected,
                }
            });
            if (!shouldBuffer && newLocalSelected !== currentValue) {
                setValue(newLocalSelected);
                onChange(newLocalSelected);
            }
        },
        [
            state.lastSearchUpdateTimestamp,
            state.searchString,
            items,
            state.localSelected,
            shouldBuffer,
            currentValue,
            setValue,
            onChange
        ]
    );
   

    /**
     * Handles key press behaviour when the list is focused
     * @param {Object} e - the event object 
     */
    // function handleListKeyDown(e) {
    //     //e.preventDefault();
    //     const { key } = e;
    //     if (key === 'ArrowUp') {
    //         e.preventDefault()
    //         updateLocalSelection(items[prevIndex]);
    //     } else if (key === 'ArrowDown') {
    //         e.preventDefault();
    //         updateLocalSelection(items[nextIndex]);
    //     } else if (key === 'Enter') {
    //        confirmSelection(items[currentIndex]);
    //     } else if (key === 'Escape') {
    //         closeMenu();
    //         labelEl.current.focus();
    //     } else {
    //         handleSearchStringUpdate(key);
    //     }
    // }

    const handleListKeyDown = useCallback(
        (e) => {
            const { key } = e;
            if (key === 'ArrowUp') {
                e.preventDefault()
                updateLocalSelection(items[prevIndex]);
            } else if (key === 'ArrowDown') {
                e.preventDefault();
                updateLocalSelection(items[nextIndex]);
            } else if (key === 'Enter') {
                confirmSelection(items[currentIndex]);
            } else if (key === 'Escape') {
                closeMenu();
                labelEl.current.focus();
            } else {
                handleSearchStringUpdate(key);
            }
        },
        [
            updateLocalSelection, 
            items,
            prevIndex,
            nextIndex,
            confirmSelection,
            currentIndex,
            closeMenu,
            labelEl.current,
            handleSearchStringUpdate
        ]
    );

    /**
     * Handles key press behaviour when the label is focused
     * @param {Object} e - the event object
     */
    // function handleLabelKeyDown(e) {
        
    //     const { key } = e;
    //     if (key === 'Enter') {
    //         e.preventDefault();
    //         openMenu();
    //     }
    // }

    const handleLabelKeyDown = useCallback(
        (e) => {
            const { key } = e;
            if (key === 'Enter') {
                e.preventDefault();
                openMenu();
            }
        },
        [openMenu]
    );

    // function getLabelProps() {
    //     return {
    //         ref: labelEl,
    //         tabIndex: '0',
    //         onClick: toggleMenu,
    //         onKeyDown: handleLabelKeyDown,
    //         role: 'label',
    //         id: 'scrolllist-label'
    //     }
    // }

    const getLabelProps = useCallback(
        () => ({
            ref: labelEl,
            tabIndex: '0',
            onClick: toggleMenu,
            onKeyDown: handleLabelKeyDown,
            role: 'label',
            id: 'scrolllist-label'
        }),
        [labelEl, toggleMenu, handleLabelKeyDown]
    );
    
    /*
        ref={labelEl}
        tabIndex="0"
        onClick={toggleMenu}
        onKeyDown={handleLabelKeyDown}
        role="label"
        id="scrolllist-label"

    */

    // function getListProps() {
    //     return {
    //         tabIndex: '-1',
    //         role: 'listbox',
    //         'aria-labelledby': 'scrolllist-label',
    //         ref: listEl,
    //         onKeyDown: handleListKeyDown,
    //         isOpen: state.isOpen,
    //         onBlur: closeMenu
    //     };
    // }

    const getListProps = useCallback(
        () => ({
            tabIndex: '-1',
            role: 'listbox',
            'aria-labelledby': 'scrolllist-label',
            ref: listEl,
            onKeyDown: handleListKeyDown,
            isOpen: state.isOpen,
            onBlur: closeMenu
        }),
        [listEl, handleListKeyDown, state.isOpen, closeMenu]
    );

    /*
        props for list itself:

        tabIndex="-1"
        role="listbox"
        aria-labelledby="scrolllist-label"
        ref={listEl}
        onKeyDown={handleListKeyDown}
        isOpen={state.isOpen}
        onBlur={() => closeMenu()}
    */

    // {state.isOpen ? items[currentIndex].name : currentValue.name}

    // function getItemProps({ item, index }) {
    //     return {
    //         role: 'option',
    //         'aria-selected': currentIndex === index ? 'true' : 'false',
    //         key: index,
    //         ref: getRef(index),
    //         isSelected: currentIndex === index,
    //         onClick: () => {
    //             confirmSelection(item)
    //         }
    //     }
    // }

    const getItemProps = useCallback(
        ({ item, index }) => ({
            role: 'option',
            'aria-selected': currentIndex === index ? 'true' : 'false',
            key: index,
            ref: getRef(index),
            isSelected: currentIndex === index,
            onClick: () => {
                confirmSelection(item)
            }
        }),
        [currentIndex, getRef, confirmSelection]
    );

    /*
        props for a list item:

        role="option"
        aria-selected={currentIndex === index ? 'true' : 'false'}
        key={index} 
        ref={getRef(index)}
        isSelected={currentIndex === index}
        onClick={() => {
            confirmSelection(item)
        }}

    */

    /*

        If I want it to utilize the render props pattern I need to expose:
        
        getLabelProps
        getListProps
        getItemProps
        state.isOpen
        state.localSelected
        currentValue
        items
    */

    return (
        <OuterContainer>
            <ListLabel {...getLabelProps()}>
                {state.isOpen ? state.localSelected.name : currentValue.name}
                <LabelIcon isOpen={state.isOpen}>&#9660;</LabelIcon>
            </ListLabel>
            <StyledListBox {...getListProps()}>
                {state.isOpen ? items.map((item, index) => (
                    <ListItem {...getItemProps({ item, index })}>
                        {item.name}
                    </ListItem>
                )) : null}
            </StyledListBox>
        </OuterContainer>
    );
}

ListBox.propTypes = {
    items: PropTypes.array.isRequired,
    currentValue: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    shouldBuffer: PropTypes.bool
};

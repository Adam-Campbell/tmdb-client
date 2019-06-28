import React, { useReducer, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import computeScrollIntoView from 'compute-scroll-into-view';

function noop() {}

const actionConstants = {
    OPEN_MENU: 'OPEN_MENU',
    CLOSE_MENU: 'CLOSE_MENU',
    UPDATE_LOCAL_SELECTION: 'UPDATE_LOCAL_SELECTION',
    CONFIRM_SELECTION: 'CONFIRM_SELECTION',
    UPDATE_SEARCH_STRING: 'UPDATE_SEARCH_STRING'
};

function reducer(state, action) {
    switch (action.type) {
        case actionConstants.OPEN_MENU:
            return {
                ...state,
                isOpen: true, 
                localSelected: action.payload.localSelected,
                searchString: '',
                lastSearchUpdateTimestamp: null
            };
        case actionConstants.CLOSE_MENU:
            return {
                ...state,
                isOpen: false,
                localSelected: action.payload.currentValue,
                searchString: '',
                lastSearchUpdateTimestamp: null
            };
        case actionConstants.UPDATE_LOCAL_SELECTION:
            return {
                ...state,
                localSelected: action.payload.localSelected,
                searchString: '',
                lastSearchUpdateTimestamp: null
            };
        case actionConstants.CONFIRM_SELECTION:
            return {
                ...state,
                isOpen: false,
                localSelected: action.payload.newValue,
                searchString: '',
                lastSearchUpdateTimestamp: null
            }
        case actionConstants.UPDATE_SEARCH_STRING:
            return {
                ...state, 
                searchString: action.payload.searchString,
                lastSearchUpdateTimestamp: action.payload.timestamp,
                localSelected: action.payload.newLocalSelected
            };
    }
}

export function RenderPropListBox({
    items,
    currentValue,
    setValue,
    shouldBuffer,
    onChange = noop,
    children,
    idPrefix = 'listbox'
}) {

    // Initialize reducer state
    const [ state, dispatch ] = useReducer(reducer, {
        isOpen: false,
        localSelected: currentValue,
        searchString: '',
        lastSearchUpdateTimestamp: null
    });

    // Instantiate refs to use for various elements
    const toggleEl = useRef(null);
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

    const toggleMenu = useCallback(
        () => {
            if (state.isOpen) {
                closeMenu();
                toggleEl.current.focus();
    
            } else {
                openMenu();
            }
        },
        [state.isOpen, toggleEl.current]
    );

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
            toggleEl.current.focus();
        },
        [setValue, onChange, toggleEl.current]
    );

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
                toggleEl.current.focus();
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
            toggleEl.current,
            handleSearchStringUpdate
        ]
    );

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

    const getLabelProps = useCallback(
        () => ({
            role: 'label',
            id: `${idPrefix}-label`
        }),
        [idPrefix]
    );

    const getMenuToggleProps = useCallback(
        () => ({
            ref: toggleEl,
            tabIndex: '0',
            onClick: toggleMenu,
            onKeyDown: handleLabelKeyDown,
        }),
        [toggleEl, toggleMenu, handleLabelKeyDown]
    );

    const getMenuProps = useCallback(
        () => ({
            tabIndex: '-1',
            role: 'listbox',
            'aria-labelledby': `${idPrefix}-label`,
            ref: listEl,
            onKeyDown: handleListKeyDown,
            isOpen: state.isOpen,
            onBlur: closeMenu
        }),
        [idPrefix, listEl, handleListKeyDown, state.isOpen, closeMenu]
    );

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

    return children({
        // Gets the props to attach to the element acting as the label
        getLabelProps,
        // Gets the props to attach to the element acting as the menu toggle
        getMenuToggleProps,
        // Gets the props to attach to the element acting as the menu
        getMenuProps,
        // Gets the props to attach to each element acting as a menu item
        getItemProps,
        // Is the menu currently open or closed
        isOpen: state.isOpen,
        // The locally selected value
        localSelected: state.localSelected,
        // The current value being passed in externally as a prop
        currentValue,
        // The full list of items featured in the listbox
        items,
        // If you want to display the name of the current selection somewhere, this will always give
        // you the correct name to display.
        displayName: state.isOpen ? state.localSelected.name : currentValue.name
    });
}

RenderPropListBox.propTypes = {
    // The list of all items to be rendered in the listbox
    items: PropTypes.array.isRequired,
    // the currently selected item from the list
    currentValue: PropTypes.object.isRequired,
    // a function to set the selected item 
    setValue: PropTypes.func.isRequired,
    // when false the external value will be updated every time local state changes, when true
    // local state can change whilst the menu is open but the external value wont be updated until
    // the choice is confirmed and the menu is closed.
    shouldBuffer: PropTypes.bool,
    // An optional callback that will be invoked everytime the value updates, with the new value passed
    // in as its argument. 
    onChange: PropTypes.func,
    // The id prefix to be used for things such as the labels id. Should be unique for each listbox on the
    // page. Default to 'listbox' if not specified.
    idPrefix: PropTypes.string
};
import React, { useReducer, useRef, useEffect, useCallback } from 'react';
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

export default function useSelect({
    items,
    currentValue,
    setValue,
    shouldBuffer,
    onChange = noop,
    idPrefix = 'listbox'
}) {
    //console.log(currentValue);
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
    }, [ state, currentItemEl.current ]);

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
        [currentItemEl, nextItemEl, prevItemEl, currentIndex, nextIndex, prevIndex]
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

    return {
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
        //currentValue,
        // The full list of items featured in the listbox
        //items,
        // If you want to display the name of the current selection somewhere, this will always give
        // you the correct name to display.
        displayName: state.isOpen ? state.localSelected.name : currentValue.name
    }
}
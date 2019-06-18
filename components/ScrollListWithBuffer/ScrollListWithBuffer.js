import React, { useReducer, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OuterContainer = styled.div`
    width: 100%;
    position: relative;
`;

const ActionButton = styled.button`
    background: #43cbe8;
    color: white;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1rem;
    padding: 10px;
    border-radius: 3px;
    border: none; cursor: pointer;
`;

const StyledScrollList = styled.ul`
    z-index: 1000;
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    width: 100%;
    max-height: 360px;
    overflow-y: auto;
    position: absolute;
    border: ${({ isOpen }) => isOpen ? 'solid 1px #222' : 'none'};
    border-radius: 3px;
    &:focus {
        outline: none;
        border-color: #43cbe8;
    }
`;

const ListItem = styled.li`
    padding: 10px;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 0.85rem;
    color: #222;
    background: ${({ isSelected }) => isSelected ? '#eee' : 'white'};
    cursor: pointer;
`;

const ListLabel = styled.div`
    display: flex;
    padding: 10px;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #222;
    cursor: pointer;
    border: solid 1px #222;
    border-radius: 3px;
    &:focus {
        border-color: #43cbe8;
        outline: none;
    }
`;

const LabelIcon = styled.span`
    font-weight: 700;
    margin-left: auto;
    ${({ isOpen }) => isOpen && `
        transform: rotate(180deg);
    `}
`;


const actionConstants = {
    OPEN_MENU: 'OPEN_MENU',
    CLOSE_MENU: 'CLOSE_MENU',
    UPDATE_LOCAL_SELECTION: 'UPDATE_LOCAL_SELECTION',
    CONFIRM_SELECTION: 'CONFIRM_SELECTION'
};

function reducer(state, action) {
    switch (action.type) {
        case actionConstants.OPEN_MENU:
            return {
                isOpen: true, 
                localSelected: action.payload.localSelected
            };
        case actionConstants.CLOSE_MENU:
            return {
                isOpen: false,
                localSelected: action.payload.currentValue
            };
        case actionConstants.UPDATE_LOCAL_SELECTION:
            return {
                ...state,
                localSelected: action.payload.localSelected
            };
        case actionConstants.CONFIRM_SELECTION:
            return {
                isOpen: false,
                localSelected: action.payload.newValue
            }
    }
}

export function ScrollListWithBuffer({ items, currentValue, setValue, shouldBuffer }) {
    
    // Initialize reducer state
    const [ state, dispatch ] = useReducer(reducer, {
        isOpen: false,
        localSelected: currentValue
    });

    // Establish the indexs of the currently selected item as well as the next and previous
    // items, so that refs can be added to these items.
    const currentIndex = items.findIndex(el => el === state.localSelected);
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;

    // Instantiate refs to use for various elements
    const containerEl = useRef(null);
    const labelEl = useRef(null);
    const listEl = useRef(null);
    const currentItemEl = useRef(null);
    const nextItemEl = useRef(null);
    const prevItemEl = useRef(null);

    // This effect will scroll the listbox in order to make sure the currently selected
    // item is visible
    useEffect(() => {
        if (!state.isOpen) return;

        currentItemEl.current && currentItemEl.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest', 
            inline: 'start' 
        });
    }, [ state ]);

    // This effect will close the listbox when you click outside of it whilst it is open
    useEffect(() => {
        function handleOuterClick(e) {
            const isOuterClick = !(e.path.includes(containerEl.current));
            if (state.isOpen && isOuterClick) {
                closeMenu();
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('click', handleOuterClick);
            return () => {
                window.removeEventListener('click', handleOuterClick);
            }
        }
    }, [ state.isOpen ]);

    /**
     * Given an index, determines whether that index should 'own' one of the refs for this render, and
     * if so it returns that ref. 
     * @param {Number} index - the index to check
     * @param {?Object} - either returns the ref object is applicable, or else returns null.
     */
    function getRef(index) {
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
    }

    /**
     * Handles action dispatching and focus management for opening the menu.
     */
    function openMenu() {
        dispatch({
            type: actionConstants.OPEN_MENU,
            payload: {
                localSelected: currentValue
            }
        });
        listEl.current.focus();
    }

    /**
     * Handles action dispatching and focus management for closing the menu.
     */
    function closeMenu() {
        dispatch({ 
            type: actionConstants.CLOSE_MENU,
            payload: {
                currentValue
            }
        });
        labelEl.current.focus();
    }

    /**
     * Calls either openMenu() or closeMenu() depending on the value of state.isOpen
     */
    function toggleMenu() {
        if (state.isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    /**
     * Updates localSelected state to match the value specified by the newSelection argument.
     * @param {String} newSelection - the new selection value
     */
    function updateLocalSelection(newSelection) {
        dispatch({
            type: actionConstants.UPDATE_LOCAL_SELECTION,
            payload: {
                localSelected: newSelection
            }
        });
        if (!shouldBuffer) {
            setValue(newSelection);
        }
    }

    /**
     * Sets the value externally using the setValue function supplied as a prop, and closes menu.
     * @param {String} selectionValue - the new value to set externally.
     */
    function confirmSelection(newValue) {
        setValue(newValue);
        dispatch({
            type: actionConstants.CONFIRM_SELECTION,
            payload: {
                newValue
            }
        });
        labelEl.current.focus();
    }

    /**
     * Handles key press behaviour when the list is focused
     * @param {Object} e - the event object 
     */
    function handleListKeyDown(e) {
        //e.preventDefault();
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
        }
    }

    /**
     * Handles key press behaviour when the label is focused
     * @param {Object} e - the event object
     */
    function handleLabelKeyDown(e) {
        e.preventDefault();
        const { key } = e;
        if (key === 'Enter') {
            openMenu();
        }
    }

    return (
        <OuterContainer 
            ref={containerEl}
        >
            <ListLabel
                ref={labelEl}
                tabIndex="0"
                onClick={toggleMenu}
                onKeyDown={handleLabelKeyDown}
                role="label"
                id="scrolllist-label"
            >
                {items[currentIndex]}
                <LabelIcon isOpen={state.isOpen}>&#9660;</LabelIcon>
            </ListLabel>
            <StyledScrollList
                tabIndex="-1"
                role="listbox"
                aria-labelledby="scrolllist-label"
                ref={listEl}
                onKeyDown={handleListKeyDown}
                isOpen={state.isOpen}
            >
                {state.isOpen ? items.map((item, index) => (
                    <ListItem 
                        role="option"
                        aria-selected={currentIndex === index ? 'true' : 'false'}
                        key={index} 
                        ref={getRef(index)}
                        isSelected={currentIndex === index}
                        onClick={() => {
                            confirmSelection(item)
                        }}
                    >
                        {item}
                    </ListItem>
                )) : null}
            </StyledScrollList>
        </OuterContainer>
    );
}

ScrollListWithBuffer.propTypes = {
    items: PropTypes.array.isRequired,
    currentValue: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    shouldBuffer: PropTypes.bool
};
import React, { useReducer, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    OuterContainer,
    StyledListBox,
    ListItem,
    ListLabel,
    LabelIcon
} from './elements';
import { reducer, actionConstants } from './reducer';

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
        localSelected: currentValue
    });

    // Establish the indexs of the currently selected item as well as the next and previous
    // items, so that refs can be added to these items.
    const currentIndex = items.findIndex(el => el.value === state.localSelected);
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
    }

    /**
     * Calls either openMenu() or closeMenu() depending on the value of state.isOpen
     */
    function toggleMenu() {
        if (state.isOpen) {
            closeMenu();
            labelEl.current.focus();

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
            onChange(newValue);
        }
    }

    /**
     * Sets the value externally using the setValue function supplied as a prop, and closes menu.
     * @param {String} selectionValue - the new value to set externally.
     */
    function confirmSelection(newValue) {
        setValue(newValue);
        onChange(newValue);
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
            updateLocalSelection(items[prevIndex].value);
        } else if (key === 'ArrowDown') {
            e.preventDefault();
            updateLocalSelection(items[nextIndex].value);
        } else if (key === 'Enter') {
           confirmSelection(items[currentIndex].value);
        } else if (key === 'Escape') {
            closeMenu();
            labelEl.current.focus();
        }
    }

    /**
     * Handles key press behaviour when the label is focused
     * @param {Object} e - the event object
     */
    function handleLabelKeyDown(e) {
        
        const { key } = e;
        if (key === 'Enter') {
            e.preventDefault();
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
                {state.isOpen ? items[currentIndex].name : items.find(el => el.value === currentValue).name}
                <LabelIcon isOpen={state.isOpen}>&#9660;</LabelIcon>
            </ListLabel>
            <StyledListBox
                tabIndex="-1"
                role="listbox"
                aria-labelledby="scrolllist-label"
                ref={listEl}
                onKeyDown={handleListKeyDown}
                isOpen={state.isOpen}
                onBlur={() => closeMenu()}
            >
                {state.isOpen ? items.map((item, index) => (
                    <ListItem 
                        role="option"
                        aria-selected={currentIndex === index ? 'true' : 'false'}
                        key={index} 
                        ref={getRef(index)}
                        isSelected={currentIndex === index}
                        onClick={() => {
                            confirmSelection(item.value)
                        }}
                    >
                        {item.name}
                    </ListItem>
                )) : null}
            </StyledListBox>
        </OuterContainer>
    );
}

ListBox.propTypes = {
    items: PropTypes.array.isRequired,
    currentValue: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    shouldBuffer: PropTypes.bool
};





// export function ListBox({ items, currentValue, setValue, shouldBuffer, onChange = noop }) {
    
//     // Initialize reducer state
//     const [ state, dispatch ] = useReducer(reducer, {
//         isOpen: false,
//         localSelected: currentValue
//     });

//     // Establish the indexs of the currently selected item as well as the next and previous
//     // items, so that refs can be added to these items.
//     const currentIndex = items.findIndex(el => el === state.localSelected);
//     const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
//     const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;

//     // Instantiate refs to use for various elements
//     const containerEl = useRef(null);
//     const labelEl = useRef(null);
//     const listEl = useRef(null);
//     const currentItemEl = useRef(null);
//     const nextItemEl = useRef(null);
//     const prevItemEl = useRef(null);

//     // This effect will scroll the listbox in order to make sure the currently selected
//     // item is visible
//     useEffect(() => {
//         if (!state.isOpen) return;

//         currentItemEl.current && currentItemEl.current.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'nearest', 
//             inline: 'start' 
//         });
//     }, [ state ]);

//     /**
//      * Given an index, determines whether that index should 'own' one of the refs for this render, and
//      * if so it returns that ref. 
//      * @param {Number} index - the index to check
//      * @param {?Object} - either returns the ref object is applicable, or else returns null.
//      */
//     function getRef(index) {
//         switch (index) {
//             case currentIndex:
//                 return currentItemEl;
//             case nextIndex:
//                 return nextItemEl;
//             case prevIndex:
//                 return prevItemEl;
//             default:
//                 return null;
//         }
//     }

//     /**
//      * Handles action dispatching and focus management for opening the menu.
//      */
//     function openMenu() {
//         dispatch({
//             type: actionConstants.OPEN_MENU,
//             payload: {
//                 localSelected: currentValue
//             }
//         });
//         listEl.current.focus();
//     }

//     /**
//      * Handles action dispatching and focus management for closing the menu.
//      */
//     function closeMenu() {
//         dispatch({ 
//             type: actionConstants.CLOSE_MENU,
//             payload: {
//                 currentValue
//             }
//         });
//     }

//     /**
//      * Calls either openMenu() or closeMenu() depending on the value of state.isOpen
//      */
//     function toggleMenu() {
//         if (state.isOpen) {
//             closeMenu();
//             labelEl.current.focus();

//         } else {
//             openMenu();
//         }
//     }

//     /**
//      * Updates localSelected state to match the value specified by the newSelection argument.
//      * @param {String} newSelection - the new selection value
//      */
//     function updateLocalSelection(newSelection) {
//         dispatch({
//             type: actionConstants.UPDATE_LOCAL_SELECTION,
//             payload: {
//                 localSelected: newSelection
//             }
//         });
//         if (!shouldBuffer) {
//             setValue(newSelection);
//             onChange(newValue);
//         }
//     }

//     /**
//      * Sets the value externally using the setValue function supplied as a prop, and closes menu.
//      * @param {String} selectionValue - the new value to set externally.
//      */
//     function confirmSelection(newValue) {
//         setValue(newValue);
//         onChange(newValue);
//         dispatch({
//             type: actionConstants.CONFIRM_SELECTION,
//             payload: {
//                 newValue
//             }
//         });
//         labelEl.current.focus();
//     }

//     /**
//      * Handles key press behaviour when the list is focused
//      * @param {Object} e - the event object 
//      */
//     function handleListKeyDown(e) {
//         //e.preventDefault();
//         const { key } = e;
//         if (key === 'ArrowUp') {
//             e.preventDefault()
//             updateLocalSelection(items[prevIndex]);
//         } else if (key === 'ArrowDown') {
//             e.preventDefault();
//             updateLocalSelection(items[nextIndex]);
//         } else if (key === 'Enter') {
//            confirmSelection(items[currentIndex]);
//         } else if (key === 'Escape') {
//             closeMenu();
//             labelEl.current.focus();
//         }
//     }

//     /**
//      * Handles key press behaviour when the label is focused
//      * @param {Object} e - the event object
//      */
//     function handleLabelKeyDown(e) {
        
//         const { key } = e;
//         if (key === 'Enter') {
//             e.preventDefault();
//             openMenu();
//         }
//     }

//     return (
//         <OuterContainer 
//             ref={containerEl}
//         >
//             <ListLabel
//                 ref={labelEl}
//                 tabIndex="0"
//                 onClick={toggleMenu}
//                 onKeyDown={handleLabelKeyDown}
//                 role="label"
//                 id="scrolllist-label"
//             >
//                 {state.isOpen ? items[currentIndex] : currentValue}
//                 <LabelIcon isOpen={state.isOpen}>&#9660;</LabelIcon>
//             </ListLabel>
//             <StyledListBox
//                 tabIndex="-1"
//                 role="listbox"
//                 aria-labelledby="scrolllist-label"
//                 ref={listEl}
//                 onKeyDown={handleListKeyDown}
//                 isOpen={state.isOpen}
//                 onBlur={() => closeMenu()}
//             >
//                 {state.isOpen ? items.map((item, index) => (
//                     <ListItem 
//                         role="option"
//                         aria-selected={currentIndex === index ? 'true' : 'false'}
//                         key={index} 
//                         ref={getRef(index)}
//                         isSelected={currentIndex === index}
//                         onClick={() => {
//                             confirmSelection(item)
//                         }}
//                     >
//                         {item}
//                     </ListItem>
//                 )) : null}
//             </StyledListBox>
//         </OuterContainer>
//     );
// }
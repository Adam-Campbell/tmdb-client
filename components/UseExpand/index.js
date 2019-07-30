import React, { useState, useRef, useLayoutEffect } from 'react';

/**
 * This hook provides the functionality for making an expandable list that when minimized will update the
 * windows scrollY so that the user is scrolled back up the page in order to remain at the end of the list.
 * This prevents possible confusion where a user might close a really long list and suddenly find themselves
 * staring at a piece of UI from much further down the page, that they might not even have looked at yet. 
 * 
 * This hook is not opinionated about what the expanding or minimizing means for your component, it provides
 * an isExpanded boolean to indicate whether the component should be expanded or minimized, it is up to the 
 * component to make the changes on its own end (render additional elements, update display values etc).
 * 
 * This hook returns:
 * 
 * isExpanded - a boolean indicating the current expansion state.
 * 
 * anchorRef - this is the element that the windows scroll will be anchored to when the list gets minimized.
 * Whatever the delta was between the top of the viewport and the top of this element just before minimzation,
 * the windows scroll will be updated just after minimization to keep that same delta (as long as that is
 * possible, in some cases the delta might be less than the anchors top offset after minimization, in which case
 * the window will just be scrolled to the top).
 * 
 * handleToggleClick - a function to call to trigger expansion / minimization. In addition to updating the
 * isExpanded state it performs DOM measurements required for keeping the anchor 'anchored' to the viewport.
 * 
 */
export default function useExpand() {
    // Prevent effect from firing on mount
    const isInitialMount = useRef(true);
    const anchorRef = useRef(null);
    // The distance between the button element and the top of the viewport
    const [ buttonDelta, setButtonDelta ] = useState(0);
    const [ isExpanded, setExpanded ] = useState(false);

    useLayoutEffect(() => {
        // The full logic won't be performed on the first render - only on subsequent ones.
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (isExpanded) return;
            // in this block buttonDelta is the distance that anchorRef was from the top of the
            // viewport BEFORE state was updated and the list was collapsed. By comparing this with
            // the new position of anchorRef after the collapse we can calculate the correct window 
            // scroll value to ensure anchorRef stays in the same position relative to the viewport.
            const { top } = anchorRef.current.getBoundingClientRect();
            const absoluteTop = top + window.scrollY;
            const newScrollY = absoluteTop - buttonDelta;
            window.scrollTo(0, newScrollY);
        }
    }, [ isExpanded, buttonDelta ]);

    function handleToggleClick() {
        const { top } = anchorRef.current.getBoundingClientRect();
        setButtonDelta(top);
        setExpanded(prev => !prev);
    }

    return {
        isExpanded, 
        anchorRef,
        handleToggleClick
    };
}

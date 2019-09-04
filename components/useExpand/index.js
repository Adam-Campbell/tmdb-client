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
    // The distance between the anchor element and the top of the document
    const [ cachedAnchorOffset, setCachedAnchorOffset ] = useState(0);
    const [ isExpanded, setExpanded ] = useState(false);

    useLayoutEffect(() => {
        // No logic needs to be performed as part of the first render cycle, or any subsequent render
        // where isExpanded is true.
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (isExpanded) return;
            // calculate the distance between the top of the viewport and the anchor element before
            // isExpanded became false.
            const prevPageY = window.pageYOffset;
            const prevAnchorOffsetRelativeToView = cachedAnchorOffset - prevPageY;
            // grab the new distance between the anchor element and the top of the entire document
            // and calculate the new scroll value for the window required to ensure that the distane
            // between the anchor element and the top of the viewport remains the same as it was when
            // isExpanded was true. 
            const nextAnchorAbsoluteOffset = anchorRef.current.offsetTop;
            const nextPageY = nextAnchorAbsoluteOffset - prevAnchorOffsetRelativeToView;
            window.scrollTo(0, nextPageY);
        }
    }, [ isExpanded, cachedAnchorOffset ]);

    function handleToggleClick() {
        const offset = anchorRef.current.offsetTop;
        setCachedAnchorOffset(offset);
        setExpanded(prev => !prev);
    }

    return {
        isExpanded, 
        anchorRef,
        handleToggleClick
    };
}

import React, { useState, useReducer, useRef } from 'react';

const OPEN_POPUP = 'OPEN_POPUP';
const CLOSE_POPUP = 'CLOSE_POPUP';

const initialState = {
    isShowingPopup: false,
    windowTopOffset: 0,
    popupX: 0,
    popupY: 0
};

function reducer(state, action) {
    switch (action.type) {
        case OPEN_POPUP:
            return {
                isShowingPopup: action.payload.isShowingPopup,
                windowTopOffset: action.payload.windowTopOffset,
                popupX: action.payload.popupX,
                popupY: action.payload.popupY
            };

        case CLOSE_POPUP:
            return initialState;

        default:
            return state;
    }
}

/**
 * @param {Object} settings - a settings object to control the hooks behaviour.
 * @param {Number} settings.popupWidth - the pixel width of the popup
 * @param {Number} settings.popupHeight - the pixel height of the popup
 * @param {('BOTTOM'|'RIGHT')} settings.popupAlignment - the way the popup should be aligned
 * relative to the anchor element.
 */
export default function usePopup({ popupWidth, popupHeight, popupAlignment }) {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const anchorEl = useRef(null);

    function calculateBottomAlignedPosition() {
        const { clientWidth } = document.documentElement;
        const { bottom, left, width } = anchorEl.current.getBoundingClientRect();
        const popupToClickedElGutter = 10;
        
        const popupY = bottom + popupToClickedElGutter;
        const idealXPos = left + (width / 2);
        const popupX = (idealXPos + (popupWidth / 2) > clientWidth) 
                ? clientWidth - popupWidth 
                : idealXPos - (popupWidth / 2);
        return {
            popupX,
            popupY
        };
    }

    function calculateRightAlignedPosition() {
        const { clientWidth } = document.documentElement;
        const { right, top, height } = anchorEl.current.getBoundingClientRect();
        const popupToClickedElGutter = 10;
        const minWindowGutter = 10;
        
        const popupY = top + (height / 2) - (popupHeight / 2);
        const idealXPos = right + popupToClickedElGutter;
        const popupX = idealXPos + popupWidth <= clientWidth - minWindowGutter
                       ? idealXPos
                       : clientWidth - minWindowGutter - popupWidth;
        return {
            popupX,
            popupY
        };
    }

    function openPopup() {
        let calculatePosFn;
        switch (popupAlignment) {
            case 'BOTTOM':
                calculatePosFn = calculateBottomAlignedPosition;
                break;
            case 'RIGHT':
                calculatePosFn = calculateRightAlignedPosition;
                break;
            default:
                calculatePosFn = calculateRightAlignedPosition;
        }
        const { popupX, popupY } = calculatePosFn();

        dispatch({
            type: OPEN_POPUP,
            payload: {
                isShowingPopup: true,
                windowTopOffset: window.scrollY,
                popupX,
                popupY
            }
        });
    }

    function closePopup() {
        dispatch({ type: CLOSE_POPUP });
    }

    return {
        isShowingPopup: state.isShowingPopup,
        windowTopOffset: state.windowTopOffset,
        popupX: state.popupX,
        popupY: state.popupY,
        anchorEl,
        openPopup,
        closePopup
    };
} 
import React, { useState, useReducer } from 'react';

export function useCount() {
    const [ count, setCount ] = useState(0);

    function incrementCount() {
        setCount(prevCount => prevCount + 1);
    }

    return [ count, incrementCount ];
}

function multiCountReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return {
                ...state,
                counters: {
                    ...state.counters,
                    [action.payload.counter]: state.counters[action.payload.counter] + 1
                }
            };
        case 'RECONCILE_COUNTERS':
            return reconcileCounters(state, action.payload.newNumberOfCounters);
        default:
            return state;
    }
}

/**
 * For when the number of counters being rendered changes. If the number has become greater it 
 * adds the additional counters (whilst preserving the ones already there). If the number has
 * become lesser it removes the extraneous counters from state. It also updates the numberOfCounters
 * state.
 * @param {*} prevState 
 * @param {*} newNumOfCounters 
 */
function reconcileCounters(prevState, newNumOfCounters) {
    let newCountersState = {};
    for (let i = 0; i < newNumOfCounters; i++) {
        newCountersState[i] = prevState.counters[i] || 1;
    }
    return {
        numberOfCounters: newNumOfCounters,
        counters: newCountersState
    }
}

function initReducer(numberOfCounters) {

    let counters = {};
    for (let i = 0; i < numberOfCounters; i++) {
        counters[i] = 1;
    }
    return {
        numberOfCounters,
        counters
    }
}

export function useMultiCount(numberOfCounters) {
    //console.log(`useMultiCount hook was called and numberOfCounters was ${numberOfCounters}`);

    const [ state, dispatch ] = useReducer(multiCountReducer, numberOfCounters, initReducer);

    //function getCount

    function getCount(counter) {
        return state.counters[counter];
    } 

    function incrementCount(counter) {
        dispatch({
            type: 'INCREMENT_COUNT',
            payload: { counter }
        })
    }

    if (numberOfCounters !== state.numberOfCounters) {
        console.log('numberOfCounters does not match');
        //dispatch({ type: 'ADD_COUNTERS' })
        dispatch({ 
            type:  'RECONCILE_COUNTERS',
            payload: { 
                newNumberOfCounters: numberOfCounters
            }
        });
    }

    return {
        getCount, 
        incrementCount
    }
}
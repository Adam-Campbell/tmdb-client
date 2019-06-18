import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';

function logAndReturn(obj) {
    console.log(obj);
    return obj;
}

const items = [
    {value: 'apple'},
    {value: 'pear'},
    {value: 'orange'},
    {value: 'grape'},
    {value: 'banana'}
];


  
function stateReducer(state, changes) {
    console.log(state, changes);
    return changes;
}

export function AutocompleteTest(props) {
    return (
        <Downshift
            onChange={(selection, state) => {
                //console.log(`You selected ${selection.value}`)
                //console.log(state);
            }}
            stateReducer={stateReducer}
            itemToString={item => (item ? item.value : '')}
        >
            {({ 
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem
            }) => (
                <div>
                    <label {...getLabelProps()}>Enter a fruit</label>
                    <input {...logAndReturn(getInputProps())} />
                    <ul {...getMenuProps()}>
                        {isOpen ? 
                            items.filter(item => !inputValue || item.value.includes(inputValue))
                            .map((item, index) => (
                                <li
                                    {...getItemProps({
                                        key: item.value,
                                        index,
                                        item,
                                        style: {
                                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                            fontWeight: selectedItem === item ? 'bold' : 'normal'
                                        }
                                    })}
                                >
                                    {item.value}  
                                </li>
                            )) : null
                        }
                    </ul>
                </div>
            )}
        </Downshift>
    );
}

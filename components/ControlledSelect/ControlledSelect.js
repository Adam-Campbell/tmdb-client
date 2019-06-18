import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';

function logAndReturn(obj) {
    console.log(obj);
    return obj;
}

function trimReturn(obj) {
    return {
        'aria-labelledby': obj['aria-labelledby'],
        id: obj.id,
        role: obj.role
    }
}

// {
//     getLabelProps,
//     getMenuProps,
//     getItemProps,
//     highlightedIndex,
//     selectedItem
// }

export function ControlledSelect({ currentValue, handleChange, items }) {

    return (
        <Downshift
            selectedItem={currentValue}
            onSelect={(item) => handleChange(item)}
        >
            {(dp) => (
                <div>
                    <label 
                        id={dp.getLabelProps().id} 
                        role="label"
                        onClick={() => {
                            dp.openMenu();
                        }}
                    >Select a view</label>
                    <span></span>
                    <ul {...logAndReturn(dp.getMenuProps())}>
                        {dp.isOpen ? items.map((item, index) => (
                            <li
                                {...dp.getItemProps({
                                    key: item,
                                    index,
                                    item,
                                    style: {
                                        backgroundColor: dp.highlightedIndex === index ? 'lightgray' : 'white',
                                        fontWeight: dp.selectedItem === item ? 'bold' : 'normal'
                                    }
                                })}
                            >
                                {item}
                            </li>
                        )) : null}
                    </ul>
                </div>
            )}
        </Downshift>
    );
}

ControlledSelect.propTypes = {
    currentValue: PropTypes.any,
    handleChange: PropTypes.func.isRequired,
    items: PropTypes.array
};

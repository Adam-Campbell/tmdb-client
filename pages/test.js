import React, { useState } from 'react';
import styled from 'styled-components';
import ListBox from '../components/ListBox';
//import RenderPropListBox from '../components/RenderPropListBox';
//import { useCount } from '../components/useCount';
import MultiCounter from '../components/MultiCounter';
import useSelect from '../components/useSelect';

const OuterContainer = styled.div`
    width: 100%;
    position: relative;
`;

const MenuLabel = styled.div`
    color: #222;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 1.25rem;
    padding: 10px;
`;


const StyledListBox = styled.ul`
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
    font-weight: ${({ isSelected }) => isSelected ? 700 : 400};
    font-size: 0.85rem;
    color: #222;
    background: ${({ isSelected }) => isSelected ? '#ddd' : 'white'};
    cursor: pointer;
    &:hover {
        background: #eee;
    }
`;

const MenuToggle = styled.div`
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

const ToggleIcon = styled.span`
    font-weight: 700;
    margin-left: auto;
    ${({ isOpen }) => isOpen && `
        transform: rotate(180deg);
    `}
`;

const fruitOptions = [
    { name: 'Apple', value: 'apple' },
    { name: 'Apricot', value: 'apricot' },
    { name: 'Orange', value: 'orange' },
    { name: 'Banana', value: 'banana' },
    { name: 'Pear', value: 'pear' },
    { name: 'Kiwi Fruit', value: 'kiwi' }
];

function TestSelect({ items, currentValue, setValue }) {
    
    const {  
        getLabelProps,
        getMenuToggleProps,
        getMenuProps,
        getItemProps,
        isOpen,
        localSelected,
        displayName
    } = useSelect({
        items: items,
        currentValue: currentValue,
        setValue: setValue,
        shouldBuffer: true,
    });

    return (
        <OuterContainer>
            <MenuLabel {...getLabelProps()}>Choose a fruit:</MenuLabel>
            <MenuToggle {...getMenuToggleProps()}>
                {displayName}
                <ToggleIcon isOpen={isOpen}>&#9660;</ToggleIcon>
            </MenuToggle>
            <StyledListBox {...getMenuProps()}>
                {isOpen ? items.map((item, index) => (
                    <ListItem {...getItemProps({ item, index })}>
                        {item.name}
                    </ListItem>
                )) : null}
            </StyledListBox>
        </OuterContainer>
    );
}


function Test(props) {
    const [ currentSelection, setSelection ] = useState(fruitOptions[0]);

    return (
        <div style={{ width: 400, marginLeft: 'auto', marginRight: 'auto' }}>
            <p>The currently selected fruit is {currentSelection.name}</p>
            <ListBox 
                items={fruitOptions}
                currentValue={currentSelection}
                setValue={setSelection}
                shouldBuffer={true}
                shouldInlineLabel={true} 
                labelText="Fruit: "
            />
        </div>
    );
}

export default Test;


/*


<TestSelect 
                items={fruitOptions}
                currentValue={currentSelection}
                setValue={setSelection}
            /> 


<button
                onClick={() => setNumberOfCounters(prev => prev + 1)}
            >+</button>
            <button
                onClick={() => setNumberOfCounters(prev => Math.max(1, prev - 1))}
            >-</button>
            <p>The currently selected fruit is: {currentSelection.name}</p>
            <MultiCounter numberOfCounters={numberOfCounters} />

<RenderPropListBox
                items={fruitOptions}
                currentValue={currentSelection}
                setValue={setSelection}
                shouldBuffer={true}
                idPrefix="fruity-select"
            >
                {({
                    getLabelProps,
                    getMenuToggleProps,
                    getMenuProps,
                    getItemProps,
                    isOpen,
                    localSelected,
                    currentValue,
                    items,
                    displayName
                }) => (
                    <OuterContainer>
                        <MenuLabel {...getLabelProps()}>Choose a fruit:</MenuLabel>
                        <MenuToggle {...getMenuToggleProps()}>
                            {displayName}
                            <ToggleIcon isOpen={isOpen}>&#9660;</ToggleIcon>
                        </MenuToggle>
                        <StyledListBox {...getMenuProps()}>
                            {isOpen ? items.map((item, index) => (
                                <ListItem {...getItemProps({ item, index })}>
                                    {item.name}
                                </ListItem>
                            )) : null}
                        </StyledListBox>
                    </OuterContainer>
                )}
            </RenderPropListBox>

*/
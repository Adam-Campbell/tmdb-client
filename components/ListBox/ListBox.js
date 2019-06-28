import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSelect from '../useSelect';
import { ChevronDown } from 'styled-icons/fa-solid';


/*

colors:

light blue: #43cbe8

dark blue: #1a435d

*/

const OuterContainer = styled.div`
    display: flex;
    flex-direction: ${({ inlineLabel }) => inlineLabel ? 'row' : 'column'};
`;

const Label = styled.label`
    font-family: sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    color: #222;
    padding: 10px 10px 10px 0;
`;

const SelectContainer = styled.div`
    position: relative;
    flex-grow: 1;
`;

const SelectMenuToggle = styled.div`
    background: #43cbe8;
    display: flex;
`;

const MenuToggleText = styled.p`
    font-family: sans-serif;
    color: #fff;
    padding: 10px;
    margin: 0;
    flex-grow: 1;
`;

const ToggleIconContainer = styled.div`
    background: #1a435d;
    color: #fff;
    font-family: sans-serif;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ToggleIcon = styled(ChevronDown)`
    width: 22px;
    color: #fff;
    transform: ${({ isOpen }) => isOpen ? `rotate(180deg)` : `rotate(0)`};
    transition: transform ease-in-out 0.2s;
`;

const SelectMenu = styled.ul`
    position: absolute;
    ${({ isOpen }) => isOpen && `border: solid 1px #ddd;`}
    list-style-type: none;
    padding-left: 0;
    width: 100%;
    margin: 0;
    z-index: 1000;
    max-height: 400px;
    overflow-y: auto;
`;

const MenuItem = styled.li`
    padding: 10px;
    font-family: sans-serif;
    font-weight: ${({ isSelected }) => isSelected ? 700 : 400};
    color: #222;
    background: ${({ isSelected }) => isSelected ? '#ddd' : '#eee'};
    &:hover {
        background: #ddd;
    }
`;

export function ListBox({ 
    items, 
    currentValue, 
    setValue, 
    shouldBuffer = true, 
    shouldInlineLabel = false,
    labelText
}) {

    const {
        getLabelProps,
        getMenuToggleProps,
        getMenuProps,
        getItemProps,
        isOpen,
        localSelected,
        displayName
    } = useSelect({
        items,
        currentValue,
        setValue,
        shouldBuffer
    });

    return (
        <OuterContainer inlineLabel={shouldInlineLabel}>
            <Label {...getLabelProps()}>{labelText}</Label>
            <SelectContainer>
                <SelectMenuToggle {...getMenuToggleProps()}>
                    <MenuToggleText>{displayName}</MenuToggleText>
                    <ToggleIconContainer>
                        <ToggleIcon isOpen={isOpen} />
                    </ToggleIconContainer>
                </SelectMenuToggle>
                <SelectMenu {...getMenuProps()}>
                    {isOpen && items.map((item, index) => (
                        <MenuItem {...getItemProps({ item, index })}>
                            {item.name}
                        </MenuItem>
                    ))}
                </SelectMenu>
            </SelectContainer>
        </OuterContainer>
    );
}

ListBox.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentValue: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    shouldBuffer: PropTypes.bool,
    shouldInlineLabel: PropTypes.bool,
    labelText: PropTypes.string.isRequired
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';
import useHover from '../useHover';
import useSelect from '../useSelect';
import { KeyboardArrowDown } from 'styled-icons/material';
import MenuListItem from './MenuListItem';

const ListBoxContainer = styled.div`
    position: relative;
    flex-grow: 1;
    ${({ inlineLabel }) => !inlineLabel && 'width: 100%;'}
`;

const OuterContainer = styled.div`
    display: flex;
    flex-direction: ${({ inlineLabel }) => inlineLabel ? 'row' : 'column'};
    align-items: ${({ inlineLabel }) => inlineLabel ? 'center' : 'flex-start'};
`;

const Label = styled.label`
    ${text('body')}
    margin-right: ${({ inlineLabel }) => inlineLabel ? '10px' : 0};
    margin-left: ${({ inlineLabel }) => inlineLabel ? 0 : '20px'};
    margin-bottom: ${({ inlineLabel }) => inlineLabel ? 0 : '5px'};
`;

const ListBoxMenuToggle = styled.div`
    background: #fff;
    height: 34px;
    border-radius: 17px;
    border: solid 1px #eee;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    cursor: pointer;
    &:focus {
        border-color: #43cbe8;
        outline: none;
    }
`;

const Text = styled.span`
    padding-left: 20px;
    
    ${text('body', { fontWeight: 700, fontSize: '0.85rem' })}
`;


const IconPlaceholder = styled.span`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    background: #eee;
    margin-right: 4px;
`;

const SubtleArrow = styled(KeyboardArrowDown)`
    width: 20px;
    color: #222;
    transition: transform ease-out 0.2s;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const Divider = styled.span`
    display: inline-block;
    width: 1px;
    height: 24px;
    background: #eee;
    margin-left: auto;
    margin-right: 8px;
`;

const Menu = styled.ul`
    position: absolute;
    list-style-type: none;
    padding-left: 0;
    margin-top: 8px;
    margin-bottom: 0;
    width: 100%;
    background: #fff;
    border-radius: 3px;
    border: ${({ isOpen }) => isOpen ? 'solid 1px #eee' : 'none'};
    box-shadow: ${({ isOpen }) => isOpen ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};
    max-height: ${({ isOpen, maxHeight }) => isOpen ? `${maxHeight}px` : 0};
    overflow: auto;
    z-index: 3000;
    &:focus {
        border-color: #43cbe8;
        outline: none;
    }
`;


export function ListBox({ 
    items, 
    currentValue, 
    setValue, 
    shouldBuffer = true,
    labelText, 
    shouldInlineLabel = false,
    onChange,
    placeholder,
    maxHeight = 500
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
        shouldBuffer,
        onChange
    });

    return (
        <OuterContainer inlineLabel={shouldInlineLabel}>
            <Label {...getLabelProps()} inlineLabel={shouldInlineLabel}>{labelText}</Label>
            <ListBoxContainer inlineLabel={shouldInlineLabel}>
                <ListBoxMenuToggle
                    {...getMenuToggleProps()}
                >
                    <Text>{displayName || placeholder}</Text>
                    <Divider />
                    <IconPlaceholder>
                        <SubtleArrow isOpen={isOpen} />
                    </IconPlaceholder>
                </ListBoxMenuToggle>
                    <Menu {...getMenuProps()} maxHeight={maxHeight}>
                        {items.map((item, index) => (
                            <MenuListItem 
                                key={index}
                                getItemProps={getItemProps}
                                item={item}
                                index={index}
                            />
                        ))}
                    </Menu>
            </ListBoxContainer>
        </OuterContainer>
    );
}

ListBox.propTypes = {
    // An array of all of the data objects for the component to render
    items: PropTypes.arrayOf(PropTypes.object).isRequired, 
    // The currently selected data object
    currentValue: PropTypes.object.isRequired,
    // A function that, when passed a data object, will set it as the new chosen
    // data object. 
    setValue: PropTypes.func.isRequired,
    // Affects keyboard navigation - when true it will allow the user to move through the list of
    // options whilst only updating an internal buffered state, the setValue function only gets 
    // called (and thus external state gets updated) when the user presses enter or clicks on an option.
    // When shouldBuffer is false any update will trigger setValue, including moving through the list of
    // options via keyboard.
    shouldBuffer: PropTypes.bool,
    // The text to use for the label.
    labelText: PropTypes.string.isRequired, 
    // Determines whether the label is displayed inline (in a row) with the main component, or if it is
    // displayed separately above. 
    shouldInlineLabel: PropTypes.bool,
    // An optional callback function that will be called when setValue is called, providing a way to perform
    // any additional side effects you may want to perform along with updating the value, without having
    // to integrate it into the setValue callback (although that will work fine too).
    onChange: PropTypes.func,
    // An optional string that will be displayed by the component when no option has been selected at all. 
    // This will only ever get used if the component doesn't start off with a currentValue, and as soon as
    // any value is chosen this string won't be used again. 
    placeholder: PropTypes.string,
    // A maximum height, in pixels, that the menu can have before it starts to use scrollbars. If not specified 
    // then a height of 500 pixels is used. 
    maxHeight: PropTypes.number
};

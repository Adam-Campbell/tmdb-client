import React from 'react';
import PropTypes from 'prop-types';
import useHover from '../useHover';
import useSelect from '../useSelect';
import MenuListItem from './MenuListItem';
import {
    ListBoxContainer,
    OuterContainer,
    Label,
    ListBoxMenuToggle,
    Text,
    IconPlaceholder,
    ArrowIcon,
    Divider,
    Menu
} from './listBoxElements';

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
                        <ArrowIcon isOpen={isOpen} />
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';
import useHover from '../useHover';
import useSelect from '../useSelect';
// Minimal chevron and caret, respectively
import { KeyboardArrowDown, ArrowDropDown } from 'styled-icons/material';
// Bold chevron
import { ChevronCircleDown } from 'styled-icons/fa-solid';


const colors = {
    darkBlue: '#1a435d',
    orange: '#f58a0b',
    green: '#6ee843',
    lightBlue: '#43cbe8',
    blueGrey: '#3a5b6f',
    red: '#dc1f3b'
};

const SelectContainer = styled.div`
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

const StyledRoundedSelect = styled.div`
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

const SubtleCaret = styled(ArrowDropDown)`
    width: 20px;
    color: #222;
`;

const BoldChevron = styled(ChevronCircleDown)`

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
    max-height: ${({ isOpen }) => isOpen ? '320px' : 0};
    transition: max-height ease-out 0.2s;
    overflow: hidden;
    z-index: 3000;
    &:focus {
        border-color: #43cbe8;
        outline: none;
    }
`;

const ListItem = styled.li`
    padding: 10px;
    ${text('body')}
    cursor: pointer;
    background: ${({ isSelected, isHovered }) => { 
        return isHovered 
               ? '#43cbe8'
               : isSelected
                   ? '#1a435d' 
                   : 'none';
    }};
    color: ${({ isSelected, isHovered }) => (isSelected || isHovered) ? '#fff' : '#222'};
`;

function MenuListItem({ getItemProps, item, index }) {
    const { isHovered, containerProps } = useHover();
    return (
        <ListItem 
            {...getItemProps({ item, index })}
            isHovered={isHovered}
            {...containerProps}
        >
            {item.name}
        </ListItem>
    );
}



export function RoundedSelect({ 
    items, 
    currentValue, 
    setValue, 
    shouldBuffer = true,
    labelText, 
    shouldInlineLabel = false 
}) {

    //const [ isOpen, setIsOpen ] = useState(false);
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
            <Label {...getLabelProps()} inlineLabel={shouldInlineLabel}>{labelText}</Label>
            <SelectContainer inlineLabel={shouldInlineLabel}>
                <StyledRoundedSelect
                    {...getMenuToggleProps()}
                >
                    <Text>{displayName}</Text>
                    <Divider />
                    <IconPlaceholder>
                        <SubtleArrow isOpen={isOpen} />
                    </IconPlaceholder>
                </StyledRoundedSelect>
                <Menu {...getMenuProps()}>
                    {items.map((item, index) => (
                        <MenuListItem 
                            key={index}
                            getItemProps={getItemProps}
                            item={item}
                            index={index}
                        />
                    ))}
                </Menu>
            </SelectContainer>
        </OuterContainer>
    );
}

RoundedSelect.propTypes = {

};


/*

<OuterContainer>
            <StyledRoundedSelect
                onClick={() => setIsOpen(prev => !prev)}
            >
                <Text>Select</Text>
                <Divider />
                <IconPlaceholder>
                    <SubtleArrow isOpen={isOpen} />
                </IconPlaceholder>
            </StyledRoundedSelect>
            <Menu isOpen={isOpen}>
                <MenuListItem>Option 1</MenuListItem>
                <MenuListItem isSelected={true}>Option 2</MenuListItem>
                <MenuListItem>Option 3</MenuListItem>
            </Menu>
        </OuterContainer>

*/
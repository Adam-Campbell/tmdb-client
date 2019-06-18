import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OuterContainer = styled.div`
    width: 100%;
    position: relative;
`;

const ActionButton = styled.button`
    background: #43cbe8;
    color: white;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1rem;
    padding: 10px;
    border-radius: 3px;
    border: none; cursor: pointer;
`;

const StyledScrollList = styled.ul`
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
    font-weight: 400;
    font-size: 0.85rem;
    color: #222;
    background: ${({ isSelected }) => isSelected ? '#eee' : 'white'};
    cursor: pointer;
`;

const ListLabel = styled.div`
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

const LabelIcon = styled.span`
    font-weight: 700;
    margin-left: auto;
    ${({ isOpen }) => isOpen && `
        transform: rotate(180deg);
    `}
`;



export function ScrollList({ items, currentValue, setValue }) {

    // Establish the indexs of the currently selected item as well as the next and previous
    // items, so that refs can be added to these items.
    const currentIndex = items.findIndex(el => el.value === currentValue);
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;

    // Instantiate refs to use for various elements
    const containerEl = useRef(null);
    const labelEl = useRef(null);
    const listEl = useRef(null);
    const currentItemEl = useRef(null);
    const nextItemEl = useRef(null);
    const prevItemEl = useRef(null);

    // Instantiate state for tracking whether listbox is open or closed
    const [ isOpen, setIsOpen ] = useState(false);

    // This effect will scroll the listbox in order to make sure the currently selected
    // item is visible
    useEffect(() => {
        if (!isOpen) return;

        currentItemEl.current && currentItemEl.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest', 
            inline: 'start' 
        });
    }, [ currentValue, isOpen ]);

    // This effect will close the listbox when you click outside of it whilst it is open
    useEffect(() => {
        function handleOuterClick(e) {
            const isOuterClick = !(e.path.includes(containerEl.current));
            if (isOpen && isOuterClick) {
                closeMenu();
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('click', handleOuterClick);
            return () => {
                window.removeEventListener('click', handleOuterClick);
            }
        }
    }, [isOpen]);

    function getRef(index) {
        switch (index) {
            case currentIndex:
                return currentItemEl;
            case nextIndex:
                return nextItemEl;
            case prevIndex:
                return prevItemEl;
            default:
                return null;
        }
    }

    function handleListKeyDown(e) {
        e.preventDefault();
        const { key } = e;
        if (key === 'ArrowUp') {
            setValue(items[prevIndex].value);
        } else if (key === 'ArrowDown') {
            setValue(items[nextIndex].value);
        } else if (key === 'Enter') {
           closeMenu(); 
        }
    }

    function handleLabelKeyDown(e) {
        e.preventDefault();
        const { key } = e;
        if (key === 'Enter') {
            openMenu();
        }
    }

    function openMenu() {
        setIsOpen(true);
        listEl.current.focus();
    }

    function closeMenu() {
        setIsOpen(false);
        labelEl.current.focus();
    }

    function toggleMenu() {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    return (
        <OuterContainer 
            ref={containerEl}
        >
            <ListLabel
                ref={labelEl}
                tabIndex="0"
                onClick={toggleMenu}
                onKeyDown={handleLabelKeyDown}
                role="label"
                id="scrolllist-label"
            >
                {items[currentIndex].name}
                <LabelIcon isOpen={isOpen}>&#9660;</LabelIcon>
            </ListLabel>
            <StyledScrollList
                tabIndex="-1"
                role="listbox"
                aria-labelledby="scrolllist-label"
                ref={listEl}
                onKeyDown={handleListKeyDown}
                isOpen={isOpen}
            >
                {isOpen ? items.map((item, index) => (
                    <ListItem 
                        role="option"
                        aria-selected={currentIndex === index ? 'true' : 'false'}
                        key={index} 
                        ref={getRef(index)}
                        isSelected={currentIndex === index}
                        onClick={() => {
                            closeMenu();
                            setValue(item.value);
                        }}
                    >
                        {item.name}
                    </ListItem>
                )) : null}
            </StyledScrollList>
        </OuterContainer>
    );
}

ScrollList.propTypes = {
    items: PropTypes.array,
    currentValue: PropTypes.any,
    setValue: PropTypes.func.isRequired
};
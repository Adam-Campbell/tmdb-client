import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';
import SearchItem from './SearchItem';
import { Search } from 'styled-icons/material';
import { Row } from '../Layout';
import { text } from '../../utils';
import Router from 'next/router';
import { a } from '../../axiosClient';

const SearchBarContainer = styled.div`
    position: sticky;
    left: 0;
    top: 50px;
    width: 100%;
    border-top: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    border-bottom: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    background: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.boxShadow};
    z-index: 2000;
`;

const InputRow = styled(Row)`
    display: flex;
    align-items: stretch;
    padding: ${({ theme }) => theme.getSpacing(2, 0)};
`;

const InputIcon = styled(Search)`
    color: ${({ theme }) => theme.colors.black};
    width: 30px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;

const Input = styled.input`
    ${text('body')}
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    font-style: italic;
    flex-grow: 1;
    text-indent: ${({ theme }) => theme.getSpacing(3)};
    border: solid 1px transparent;
    border-radius: 25px;
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const Menu = styled.ul`
    position: absolute;
    width: 100%;
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    z-index: 2000;
`;

function searchStringToItems(str) {
    if (str === '') {
        return [];
    } else {
        return [
            { 
                id: 'search-in-movie', 
                value: str,
                entityType: 'movie'
            },
            { 
                id: 'search-in-tv', 
                value: str,
                entityType: 'tv'
            },
            { 
                id: 'search-in-person', 
                value: str,
                entityType: 'person'
            },
        ]
    }
}

function handleRedirect(item) {
    Router.push({
        pathname: '/search',
        query: {
            category: item.entityType,
            query: item.value 
        }
    });
}

export function SearchBar(props) {
    const [ trendingSearches, setTrendingSearches ] = useState([]);
    const [ inputValue, setInputValue ] = useState('');
    const inputEl = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trendingDataResponse = await a.get('api/trending');
                setTrendingSearches(trendingDataResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const itemsToRender = [
        ...searchStringToItems(inputValue), 
        ...trendingSearches
    ];
    
    return (
        <Downshift
            onChange={handleRedirect}
            selectedItem={null}
            inputValue={inputValue}
            itemToString={item => (item ? item.value : '')}
        >
            {({
                getRootProps,
                getInputProps,
                getToggleButtonProps,
                getMenuProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
                openMenu,
                closeMenu,
                setHighlightedIndex
            }) => (
                <SearchBarContainer {...getRootProps()}>
                    <InputRow>
                        <InputIcon />
                        <Input {...getInputProps({
                            placeholder: "Search for a movie, TV show or person...", 
                            onFocus: openMenu,
                            onChange: (e) => {
                                setInputValue(e.target.value);
                            },
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    if (itemsToRender[highlightedIndex]) {
                                        const newVal = itemsToRender[highlightedIndex].value;
                                        setInputValue(newVal);
                                    } else {
                                        handleRedirect({
                                            value: inputValue,
                                            entityType: 'movie'
                                        });
                                        closeMenu();
                                    }
                                }
                            }
                        })}></Input>
                    </InputRow>
                    <Menu {...getMenuProps()}>
                        {isOpen ? (
                            itemsToRender.map((item, index) => (
                                <SearchItem 
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    getItemProps={getItemProps}
                                    setInputValue={setInputValue}
                                    highlightedIndex={highlightedIndex}
                                />
                            ))
                        ) : null}
                    </Menu>
                </SearchBarContainer>
            )}
        </Downshift>
    );
}

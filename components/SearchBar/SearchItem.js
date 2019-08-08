import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Movie, Tv, Person, Search } from 'styled-icons/material';
import { text } from '../../utils';
import { Row } from '../Layout';

const SearchIcon = styled(Search)`
    color: ${({ theme }) => theme.colors.black};
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    flex-shrink: 0;
`;

const MovieIcon = styled(Movie)`
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    flex-shrink: 0;
`;

const TVIcon = styled(Tv)`
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    flex-shrink: 0;
`;

const PersonIcon = styled(Person)`
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    flex-shrink: 0;
`;

const StyledSearchItem = styled.li`
    cursor: pointer;
    background: ${({ theme, isHighlighted }) => isHighlighted ? theme.colors.primary : theme.colors.white};
    color: ${({ theme, isHighlighted }) => isHighlighted ? theme.colors.white : theme.colors.black};
    border-bottom: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    &:first-child {
        border-top: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    }
`;

const SearchItemContentContainer = styled(Row)`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(1, 0)};
`;

const SearchItemName = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    color: inherit;
    margin: 0;
    max-width: 100%;
`;

const CategoryLabel = styled.span`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    font-style: italic;
    color: inherit;
    display: inline-block;
    margin-left: ${({ theme }) => theme.getSpacing(1)};
`;

function getIcon(entityType) {
    switch (entityType) {
        case 'movie':
            return <MovieIcon />;
        case 'tv':
            return <TVIcon />;
        case 'person':
            return <PersonIcon />;
        default:
            return <SearchIcon />;
    }
}

function getItemCategoryLabel(itemId, entityType) {
    if (itemId !== 'search-in-movie' && itemId !== 'search-in-tv' && itemId !== 'search-in-person') {
        return null;
    }
    switch (entityType) {
        case 'movie':
            return <CategoryLabel>in movies</CategoryLabel>;
        case 'tv':
            return <CategoryLabel>in TV shows</CategoryLabel>;
        case 'person':
            return <CategoryLabel>in People</CategoryLabel>;
        default:
            return null;
    }
}

export default function SearchItem({ item, index, getItemProps, setInputValue, highlightedIndex }) {
    const itemProps = getItemProps({
        item,
        index,
        onClick: () => {
            setInputValue(item.value);
            console.log(`Redirecting to search route with ${item.value}`);
        },
        isHighlighted: highlightedIndex === index
    });
    return (
        <StyledSearchItem 
            {...itemProps}
        >
            <SearchItemContentContainer>
                {getIcon(item.entityType)}
                <SearchItemName>{item.value}</SearchItemName>
                {getItemCategoryLabel(item.id, item.entityType)}
            </SearchItemContentContainer>
        </StyledSearchItem>
    );   
}

SearchItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    getItemProps: PropTypes.func.isRequired,
    setInputValue: PropTypes.func.isRequired,
    highlightedIndex: PropTypes.number
};
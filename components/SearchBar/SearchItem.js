import React from 'react';
import PropTypes from 'prop-types';
import {
    SearchIcon,
    MovieIcon,
    TVIcon,
    PersonIcon,
    StyledSearchItem,
    SearchItemContentContainer,
    SearchItemName,
    CategoryLabel
} from './searchItemElements';

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

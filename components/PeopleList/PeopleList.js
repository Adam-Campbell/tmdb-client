import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PersonListItem from './PersonListItem';
import { text } from '../../utils';
import { ChevronDown } from 'styled-icons/fa-solid';
import useExpand from '../useExpand';

const Title = styled.h3`
    ${text('heading')}
`;

const StyledPeopleList = styled.ol`
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    @media (min-width: 550px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const ToggleExpandedButton = styled.button`
    border: none;
    color: #222;
    background: #eee;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    ${text('body', { fontWeight: 400 })}
`;

const ToggleIcon = styled(ChevronDown)`
    color: #222;
    width: 14px;
    margin-left: 10px;
    transform: ${({ isExpanded }) => isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

export function PeopleList({ 
    title, 
    people, 
    shouldAllowExpansion,
    unexpandedItemCount 
}) {
    
    const {
        isExpanded, 
        anchorRef,
        handleToggleClick
    } = useExpand();

    return (
        <div>
            <Title>{title}</Title>
            <StyledPeopleList>
                {people.map((person, index) => (
                    <PersonListItem
                        key={`${person.id}--${index}`}
                        id={person.id}
                        name={person.name}
                        description={person.character || person.job}
                        imagePath={person.profile_path}
                        isHidden={shouldAllowExpansion && !isExpanded && index >= unexpandedItemCount}
                    />
                ))}
            </StyledPeopleList>
            {shouldAllowExpansion && (
                <ToggleExpandedButton
                    ref={anchorRef}
                    onClick={handleToggleClick}
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                    <ToggleIcon isExpanded={isExpanded}/>
                </ToggleExpandedButton>
            )}
        </div>
    );
}

PeopleList.propTypes = {
    title: PropTypes.string.isRequired,
    people: PropTypes.arrayOf(PropTypes.object),
    shouldAllowExpansion: PropTypes.bool,
    unexpandedItemCount: PropTypes.number
};

PeopleList.defaultProps = {
    shouldAllowExpansion: true,
    unexpandedItemCount: 6
};

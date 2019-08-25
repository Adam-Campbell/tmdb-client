import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PersonListItem from './PersonListItem';
import { text } from '../../utils';
import { ChevronDown } from 'styled-icons/fa-solid';
import useExpand from '../useExpand';
import { Button } from '../Buttons';

const Title = styled.h3`
    ${({ theme }) => theme.fontStacks.heading()};
    font-size: ${({ theme }) => theme.fontSizes.heading.md};
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
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

const ToggleExpandedButton = styled(Button)`
    display: flex;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
`;

const ToggleIcon = styled(ChevronDown)`
    color: ${({ theme }) => theme.colors.white};
    width: 14px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
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
        <>
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
                    buttonRef={anchorRef}
                    onClick={handleToggleClick}
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                    <ToggleIcon isExpanded={isExpanded}/>
                </ToggleExpandedButton>
            )}
        </>
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

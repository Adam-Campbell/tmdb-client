import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PersonListItem from './PersonListItem';
import { text } from '../../utils';
import { ChevronDown } from 'styled-icons/fa-solid';

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
    // Prevent effect from firing on mount
    const isInitialMount = useRef(true);
    const buttonEl = useRef(null);
    // The distance between the button element and the top of the viewport
    const [ buttonDelta, setButtonDelta ] = useState(0);
    const [ isExpanded, setExpanded ] = useState(false);
    
    useLayoutEffect(() => {
        // The full logic won't be performed on the first render - only on subsequent ones.
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (isExpanded) return;
            // in this block buttonDelta is the distance that buttonEl was from the top of the
            // viewport BEFORE state was updated and the list was collapsed. By comparing this with
            // the new position of buttonEl after the collapse we can calculate the correct window 
            // scroll value to ensure buttonEl stays in the same position relative to the viewport.
            const { top } = buttonEl.current.getBoundingClientRect();
            const absoluteTop = top + window.scrollY;
            const newScrollY = absoluteTop - buttonDelta;
            window.scrollTo(0, newScrollY);
        }
    }, [isExpanded, buttonDelta])


    function handleToggleClick() {
        const { top } = buttonEl.current.getBoundingClientRect();
        setButtonDelta(top);
        setExpanded(prev => !prev);
    }

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
                        imagePath={person.profile_path || '/5lzG6z74a8aYVWLsoAQVkyh5IEa.jpg'}
                        isHidden={shouldAllowExpansion && !isExpanded && index >= unexpandedItemCount}
                    />
                ))}
            </StyledPeopleList>
            {shouldAllowExpansion && (
                <ToggleExpandedButton
                    ref={buttonEl}
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

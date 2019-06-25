import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PersonListItem from './PersonListItem';
import { text } from '../../utils';

const PeopleListContainer = styled.div`
    width: 100%;
    @media(min-width: 768px) {
        width: 50%;
    }
`;

const Title = styled.h3`
    ${text('heading')}
`;

const StyledPeopleList = styled.ul`
    list-style-type: none;
    padding-left: 0;
`;


export function PeopleList({ title, people }) {
    return (
        <PeopleListContainer>
            <Title>{title}</Title>
            <StyledPeopleList>
                {people.map((person, index) => (
                    <PersonListItem
                        key={`${person.id}--${index}`}
                        id={person.id}
                        name={person.name}
                        description={person.character || person.job}
                        imagePath={person.profile_path || '/5lzG6z74a8aYVWLsoAQVkyh5IEa.jpg'}
                    />
                ))}
            </StyledPeopleList>
        </PeopleListContainer>
    );
}

PeopleList.propTypes = {
    title: PropTypes.string.isRequired,
    people: PropTypes.arrayOf(PropTypes.object)
};

/*

{people.map(person => (
                    <PersonListItem
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        description={person.character || person.job}
                        imagePath={person.imagePath || '/5lzG6z74a8aYVWLsoAQVkyh5IEa.jpg'}
                    />
                ))}

*/
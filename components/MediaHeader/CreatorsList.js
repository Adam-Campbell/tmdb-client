import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { text } from '../../utils';

const StyledCreatorsList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    margin-left: ${({ theme }) => `-${theme.getSpacing(3)}`};
`;

const CreatorsSubheading = styled.p`
    ${text('heading', { fontSize: '1rem', color: '#fff' })}
`;

const ListItem = styled.li`
    padding: ${({ theme }) => theme.getSpacing(1, 3)};
`;

const CreatorLink = styled.a`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export default function CreatorsList({ creators }) {
    return (
        <>
            <CreatorsSubheading>Created by</CreatorsSubheading>
            <StyledCreatorsList>
                {creators.slice(0,3).map(creator => (
                    <ListItem key={creator.id}>
                        <Link href={`/person?id=${creator.id}`} as={`/person/${creator.id}`} passHref>
                            <CreatorLink>{creator.name}</CreatorLink>
                        </Link>
                    </ListItem>
                ))}
            </StyledCreatorsList>
        </>
    );
}

CreatorsList.propTypes = {
    creators: PropTypes.arrayOf(PropTypes.shape({
        credit_id: PropTypes.string,
        gender: PropTypes.number,
        id: PropTypes.number,
        name: PropTypes.string,
        profile_path: PropTypes.string
    }))
};

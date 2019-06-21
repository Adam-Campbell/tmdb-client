import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Subheading } from './elements';

const StyledCreatorsList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
`;

const ListItem = styled.li`
    padding: 5px 15px;
`;

const CreatorLink = styled.a`
    font-family: sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export default function CreatorsList({ creators }) {
    return (
        <>
            <Subheading>Created by</Subheading>
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
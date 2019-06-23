import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';

const TagListHeading = styled.h3`
    ${text('heading', { fontSize: '1.125rem' })}
    margin-bottom: 5px;
`;

const StyledTagList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-left: -5px;
    margin-right: -5px;
    margin-top: 0;
`;

const Tag = styled.li`
    background: #eee;
    padding: 10px;
    border-radius: 3px;
    display: inline-block;
    margin: 5px;
    ${text('body')}
`;

export function TagList({ title, tagData }) {
    return (
        <>
            <TagListHeading>{title}</TagListHeading>
            <StyledTagList>
                {tagData.map(tag => (
                    <Tag key={tag.id}>{tag.name}</Tag>
                ))}
            </StyledTagList>
        </>
    );
}

TagList.propTypes = {
    title: PropTypes.string.isRequired,
    tagData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired
};
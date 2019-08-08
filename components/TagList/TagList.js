import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';

const TagListHeading = styled.h3`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    margin: ${({ theme }) => theme.getSpacing(3, 0, 1, 0)};
`;

const StyledTagList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-left: ${({ theme }) => `-${theme.getSpacing(1)}`};
    margin-right: ${({ theme }) => `-${theme.getSpacing(1)}`};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.getSpacing(2)};
`;

const Tag = styled.li`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    background: ${({ theme }) => theme.colors.uiPrimary};
    padding: ${({ theme }) => theme.getSpacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius};
    display: inline-block;
    margin: ${({ theme }) => theme.getSpacing(1)};
`;

export function TagList({ title, tagData }) {
    
    if (!tagData.length) return null;

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
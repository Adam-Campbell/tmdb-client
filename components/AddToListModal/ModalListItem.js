import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../useHover';
import { text } from '../../utils';

const ListItem = styled.li`
    background: ${({ isHovered }) => isHovered ? theme.colors.uiPrimary : 'transparent'};
    transition: background ease-out 0.2s;
    padding: ${({ theme }) => theme.getSpacing(2)};
    border-bottom: solid 2px ${({ theme }) => theme.colors.black};
    cursor: pointer;
`;

const ListItemText = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    margin-top: 0;
    margin-bottom: 0;
`;

export default function ModalListItem({ name, handleClick }) {
    const { isHovered, containerProps } = useHover();
    return (
        <ListItem onClick={handleClick} {...containerProps} isHovered={isHovered}>
            <ListItemText>{name}</ListItemText>
        </ListItem>
    );
}

ModalListItem.propTypes = {
    name: PropTypes.string,
    handleClick: PropTypes.func
};
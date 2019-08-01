import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../useHover';
import { text } from '../../utils';

const ListItem = styled.li`
    background: ${({ isHovered }) => isHovered ? '#eee' : 'transparent'};
    transition: background ease-out 0.2s;
    padding: 10px;
    border-bottom: solid 2px #222;
    cursor: pointer;
`;

const ListItemText = styled.p`
    ${text('body')}
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
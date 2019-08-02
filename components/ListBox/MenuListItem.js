import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../useHover';
import { text } from '../../utils';

const StyledMenuListItem = styled.li`
    padding: 10px;
    ${text('body')}
    cursor: pointer;
    background: ${({ isSelected, isHovered }) => { 
        return isHovered 
               ? '#43cbe8'
               : isSelected
                   ? '#1a435d' 
                   : 'none';
    }};
    color: ${({ isSelected, isHovered }) => (isSelected || isHovered) ? '#fff' : '#222'};
`;

export default function MenuListItem({ getItemProps, item, index }) {
    const { isHovered, containerProps } = useHover();
    return (
        <StyledMenuListItem 
            {...getItemProps({ item, index })}
            isHovered={isHovered}
            {...containerProps}
        >
            {item.name}
        </StyledMenuListItem>
    );
}

MenuListItem.propTypes = {
    getItemProps: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../useHover';
import { text } from '../../utils';

const StyledMenuListItem = styled.li`
    padding: ${({ theme }) => theme.getSpacing(2)};
    ${({ theme }) => theme.fontStacks.body()}
    cursor: pointer;
    background: ${({ theme, isSelected, isHovered }) => { 
        return isHovered 
               ? theme.colors.primary
               : isSelected
                   ? theme.colors.complimentary
                   : theme.colors.white;
    }};
    color: ${({ theme, isSelected, isHovered }) => (isSelected || isHovered) ? theme.colors.white : theme.colors.black};
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

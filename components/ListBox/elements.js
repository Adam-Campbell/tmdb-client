import styled from 'styled-components';

export const OuterContainer = styled.div`
    width: 100%;
    position: relative;
`;


export const StyledListBox = styled.ul`
    z-index: 1000;
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    width: 100%;
    max-height: 360px;
    overflow-y: auto;
    position: absolute;
    border: ${({ isOpen }) => isOpen ? 'solid 1px #222' : 'none'};
    border-radius: 3px;
    &:focus {
        outline: none;
        border-color: #43cbe8;
    }
`;

export const ListItem = styled.li`
    padding: 10px;
    font-family: sans-serif;
    font-weight: ${({ isSelected }) => isSelected ? 700 : 400};
    font-size: 0.85rem;
    color: #222;
    background: ${({ isSelected }) => isSelected ? '#ddd' : 'white'};
    cursor: pointer;
    &:hover {
        background: #eee;
    }
`;

export const ListLabel = styled.div`
    display: flex;
    padding: 10px;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #222;
    cursor: pointer;
    border: solid 1px #222;
    border-radius: 3px;
    &:focus {
        border-color: #43cbe8;
        outline: none;
    }
`;

export const LabelIcon = styled.span`
    font-weight: 700;
    margin-left: auto;
    ${({ isOpen }) => isOpen && `
        transform: rotate(180deg);
    `}
`;

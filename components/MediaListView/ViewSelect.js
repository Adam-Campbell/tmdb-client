import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cardViews from './cardViewsConstant';

const StyledViewSelect = styled.div`
    width: 180px;
    position: relative;
`;

const Fieldset = styled.fieldset`
    padding: 0;
    border: 0;
    margin: 0;
`;

const Legend = styled.legend`
    padding: 10px;
    width: 100%;
    cursor: pointer;
    border: solid 1px #aaa;
    border-radius: ${({ isOpen }) => isOpen ? '3px 3px 0 0' : '3px'};
    ${({ isOpen }) => isOpen && 'border-bottom-color: #f6f6f6;'}
    font-family: sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #1a435d;
    background: #f6f6f6;
    &:focus {
        background: #e5e5e5;
        outline: none;
    }
`;

// Due to display: flex on <legend> bug in safari, all content inside legend is wrapped in
// this additional <span> that has display: flex applied to it
const LegendInner = styled.span`
    display: flex;
    align-items: center;
`;

const LegendIconContainer = styled.span`
    margin-left: auto;
`;

const DropdownContainer = styled.div`
    position: absolute;
    overflow-y: hidden;
    height: ${({ isOpen }) => isOpen ? 'auto' : '0'};
    z-index: 200;
    background: #f6f6f6;
    width: 100%;
    border-radius: 0 0 3px 3px;
    ${({ isOpen }) => isOpen && `
        border: solid 1px #aaa;
        border-top: none;
    `}
`;

const InputContainer = styled.div`
    padding: 10px;
`;

const RadioButton = styled.input`
    opacity: 0;
    position: absolute;
    left: -99999px;
`;

const RadioLabel = styled.label`
    font-family: sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    color: #222;
    width: 100%;
    display: inline-block;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
    ${RadioButton}:checked + & {
        font-weight: 700;
    }
    ${RadioButton}:focus + & {
        color: #43cbe8;
    }
`;

function ViewSelect({ handleChange, currentValue }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const backdropInputEl = useRef(null);
    const posterInputEl = useRef(null);

    function initDropdown(e) {
        e.persist();
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
            // Prevent page scrolling if ArrowDown is pressed
            e.preventDefault();
            setIsOpen(true);
            if (currentValue === cardViews.backdrop) {
                backdropInputEl.current.focus();
            } else {
                posterInputEl.current.focus();
            }
        } 
    }

    return (
        <StyledViewSelect>
            <Fieldset>
                <Legend 
                    onClick={() => setIsOpen(prev => !prev)}
                    isOpen={isOpen}
                    tabIndex="0"
                    onKeyDown={initDropdown}
                >
                    <LegendInner>
                    View 
                    <LegendIconContainer>&#9660;</LegendIconContainer>
                    </LegendInner>
                </Legend>
                <DropdownContainer isOpen={isOpen}>
                    <InputContainer>
                        <RadioButton 
                            ref={backdropInputEl}
                            type="radio"
                            id="select_view_backdrop"
                            name="select_view"
                            checked={currentValue === cardViews.backdrop}
                            onChange={() => {
                                handleChange(cardViews.backdrop);
                                setIsOpen(false);
                            }}
                        />
                        <RadioLabel htmlFor="select_view_backdrop">Backdrop Card View</RadioLabel>
                    </InputContainer>
                    <InputContainer>
                        <RadioButton 
                            ref={posterInputEl}
                            type="radio"
                            id="select_view_poster"
                            name="select_view"
                            checked={currentValue === cardViews.poster}
                            onChange={() => {
                                handleChange(cardViews.poster);
                                setIsOpen(false);
                            }}
                        />
                        <RadioLabel htmlFor="select_view_poster">Poster Card View</RadioLabel>
                    </InputContainer>
                </DropdownContainer>
            </Fieldset>
        </StyledViewSelect>
    );
}

ViewSelect.propTypes = {
    handleChange: PropTypes.func.isRequired,
    currentValue: PropTypes.string.isRequired
};

export default ViewSelect;
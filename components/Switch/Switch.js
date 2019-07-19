import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text, hideElement } from '../../utils';

/*



*/

const Fieldset = styled.fieldset`
    border: none;
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const Legend = styled.legend`
    ${text('body', { fontWeight: 700 })}
    ${({ shouldHide }) => shouldHide && hideElement()}
`;

const RadioButtonsContainer = styled.div`
    width: 100%;
    display: flex;
`;

const RadioButton = styled.input`
    opacity: 0;
    position: absolute;
    left: -9999px;
`;

const RadioButtonLabel = styled.label`
    ${text('body', { fontSize: '0.85rem' })}
    padding: 10px;
    background: #eee;
    cursor: pointer;
    transition: background ease-out 0.2s;
    flex-grow: 1;
    text-align: center;
    ${RadioButton}:checked + & {
        background: #ddd;
        font-weight: 700;
    }
    &:hover {
        background: #e6e6e6;
    }
    &:first-of-type {
        border-radius: 3px 0 0 3px;
    }
    &:last-of-type {
        border-radius: 0 3px 3px 0;
    }
`;

export function Switch({ 
    groupLabel, 
    groupName, 
    radioButtonsData, 
    currentValue, 
    handleChange,
    shouldHideLabel 
}) {
    return (
        <Fieldset>
            <Legend shouldHide={shouldHideLabel} >{groupLabel}</Legend>
            <RadioButtonsContainer>
                {radioButtonsData.map(buttonData => (
                    <React.Fragment key={buttonData.id}>
                        <RadioButton 
                            type="radio"
                            id={buttonData.id}
                            name={groupName}
                            value={buttonData.value}
                            checked={currentValue === buttonData.value}
                            onChange={e => handleChange(buttonData.value)}
                        />
                        <RadioButtonLabel
                            htmlFor={buttonData.id}
                        >{buttonData.name}</RadioButtonLabel>
                    </React.Fragment>
                ))}
            </RadioButtonsContainer>
        </Fieldset>
    );
}

Switch.propTypes = {
    groupLabel: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    radioButtonsData: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    })).isRequired,
    currentValue: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    shouldHideLabel: PropTypes.bool
};
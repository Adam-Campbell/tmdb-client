import React from 'react';
import PropTypes from 'prop-types';
import {
    Fieldset,
    Legend, 
    RadioButtonsContainer,
    RadioButton,
    RadioButtonLabel,
} from './styledElements';

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

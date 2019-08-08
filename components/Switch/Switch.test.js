import React from 'react';
import { render, fireEvent } from '../../testUtils';
import { Switch } from './Switch';

test('it renders the group label passed to it', () => {
    const { getByText } = render(<Switch 
        groupLabel="Role Type"
        groupName="role-type"
        radioButtonsData={[
            { name: 'Both', value: 'both', id: 'role-type-both' },
            { name: 'Cast', value: 'cast', id: 'role-type-cast' },
            { name: 'Crew', value: 'crew', id: 'role-type-crew' },
        ]}
        currentValue="both"
        handleChange={() => {}}
        shouldHideLabel={false}
    />);
    expect(getByText('Role Type')).toBeInTheDocument();
});

test('it renders a radio button and a label for each item passed to it', () => {
    const { getByLabelText, getByDisplayValue } = render(<Switch 
        groupLabel="Role Type"
        groupName="role-type"
        radioButtonsData={[
            { name: 'Both', value: 'both', id: 'role-type-both' },
            { name: 'Cast', value: 'cast', id: 'role-type-cast' },
            { name: 'Crew', value: 'crew', id: 'role-type-crew' },
        ]}
        currentValue="both"
        handleChange={() => {}}
        shouldHideLabel={false}
    />);

    expect(getByLabelText('Both')).toBeInTheDocument();
    expect(getByDisplayValue('both')).toBeInTheDocument();

    expect(getByLabelText('Cast')).toBeInTheDocument();
    expect(getByDisplayValue('cast')).toBeInTheDocument();

    expect(getByLabelText('Crew')).toBeInTheDocument();
    expect(getByDisplayValue('crew')).toBeInTheDocument();

});

test('a radio button is checked only if its value matches the currentValue prop', () => {
    const { getByDisplayValue } = render(<Switch 
        groupLabel="Role Type"
        groupName="role-type"
        radioButtonsData={[
            { name: 'Both', value: 'both', id: 'role-type-both' },
            { name: 'Cast', value: 'cast', id: 'role-type-cast' },
            { name: 'Crew', value: 'crew', id: 'role-type-crew' },
        ]}
        currentValue="both"
        handleChange={() => {}}
        shouldHideLabel={false}
    />);
    expect(getByDisplayValue('both').checked).toBe(true);
    expect(getByDisplayValue('cast').checked).toBe(false);
    expect(getByDisplayValue('crew').checked).toBe(false);
});

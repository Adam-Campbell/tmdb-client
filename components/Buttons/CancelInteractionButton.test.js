import React from 'react';
import { CancelInteractionButton } from './CancelInteractionButton';
import { render, fireEvent } from '@testing-library/react'

test('it renders the label text passed to it', () => {
    const { getByText, container } = render(<CancelInteractionButton 
        label="Cancel"
        onClick={() => {}}
    />);
    expect(getByText('Cancel')).toBeInTheDocument();
});

test('it calls the onClick callback passed to it when clicked', () => {
    const mockedHandleClick = jest.fn();
    const { container } = render(<CancelInteractionButton 
        label="Cancel"
        onClick={mockedHandleClick}
    />);
    fireEvent.click(container.firstChild);
    expect(mockedHandleClick).toHaveBeenCalled();
});

import React from 'react';
import { Button } from './Button';
import { render, fireEvent } from '../../testUtils';

test('it renders the text passed into it', () => {
    const { getByText } = render(<Button>A simple button</Button>);
    expect(getByText('A simple button')).toBeInTheDocument();
});

test('it attaches the appropriate type attribute', () => {
    const { container: containerOne } = render(<Button shouldSubmit={true}>With submit role</Button>);
    expect(containerOne.firstChild).toHaveAttribute('type', 'submit');
    const { container: containerTwo } = render(<Button shouldSubmit={false}>With submit role</Button>);
    expect(containerTwo.firstChild).toHaveAttribute('type', 'button');
});

test('when clicked it calls the onClick function passed to it', () => {
    const mockedOnClick = jest.fn();
    const { container } = render(<Button onClick={mockedOnClick}>Button with click handler</Button>);
    fireEvent.click(container.firstChild);
    expect(mockedOnClick).toHaveBeenCalled();
})
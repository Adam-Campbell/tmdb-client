import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { SimpleButton } from './SimpleButton';

test('it renders the text passed into it', () => {
    /*
        The render method returns an object with various properties on it that are utilities for
        checking assertions about the rendered component, including:
        container,
        getByText, 
        getByTestId,
        asFragment
    */
    const { container, getByText } = render(
        <SimpleButton>I am a simple button!</SimpleButton>
    );
    // Normally the expect object provided by Jest does not have a toBeInTheDocument method,
    // this is provided by '@testing-library/jest-dom/extend-expect', which we have added in
    // jest.config.js
    expect(getByText('I am a simple button!')).toBeInTheDocument();
});

test('it matches snapshot', () => {
    const { container } = render(
        <SimpleButton>I am a simple button!</SimpleButton>
    );
    // The render method renders our component inside a DIV by default, and then mounts
    // that DIV to the DOM provided by JS-DOM. So for the purposes of snapshot testing, 
    // we check container.firstChild (which is our actual component) rather than just
    // container, which would be the DIV.
    expect(container.firstChild).toMatchSnapshot();
});
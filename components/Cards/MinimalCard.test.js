import React from 'react';
import { MinimalCard } from './MinimalCard';
import { render } from '../../testUtils';

beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
        constructor() {}
        observe() { return null }
        unobserve() { return null }
        disconnect() { return null }
    }
});

test('it renders an image with the appropriate alt text', () => {
    const { getByAltText } = render(<MinimalCard 
        id={123456}
        name="Game of Thrones"
        imagePath="/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
        urlSubpath="/show"
    />);
    expect(getByAltText('Game of Thrones')).toBeInTheDocument();
});

test('it renders a link with the correct href according to the props supplied', () => {
    const { getByTestId } = render(<MinimalCard 
        id={123456}
        name="Game of Thrones"
        imagePath="/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
        urlSubpath="/show"
    />);
    expect(getByTestId('name-link')).toHaveAttribute('href', '/show/123456');
});

test('the link uses the text passed as the name prop for its anchor text', () => {
    const { getByTestId } = render(<MinimalCard 
        id={123456}
        name="Game of Thrones"
        imagePath="/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
        urlSubpath="/show"
    />);
    expect(getByTestId('name-link')).toHaveTextContent('Game of Thrones');
});
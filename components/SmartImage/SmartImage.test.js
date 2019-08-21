import React from 'react';
import { SmartImage } from './SmartImage';
import { render, waitForDomChange } from '../../testUtils';
import { imageSizeConstants } from '../../utils';

beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
        constructor() {}
        observe() { return null }
        unobserve() { return null }
        disconnect() { return null }
    }
});

test('it renders an image if an image path is passed to it', () => {
    const { getByTestId } = render(<SmartImage 
        imagePath="/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
        imageSize={imageSizeConstants.w342}
        alt="Game of Thrones"
    />);
    expect(getByTestId('image-element')).toBeInTheDocument();
});

test('it renders a placeholder element if an image path is not supplied', () => {
    const { getByTestId } = render(<SmartImage 
        imagePath={null}
        imageSize={imageSizeConstants.w342}
        alt="Game of Thrones"
    />);
    expect(getByTestId('placeholder-element')).toBeInTheDocument();
});

test('it sets the images alt tag according to the alt prop provided', () => {
    const { getByAltText } = render(<SmartImage 
        imagePath="/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
        imageSize={imageSizeConstants.w342}
        alt="Game of Thrones"
    />);
    expect(getByAltText('Game of Thrones')).toBeInTheDocument();
});

test('if an image path is supplied, the images src attribute is not initially set', () => {
    const { getByTestId } = render(<SmartImage 
        imagePath="/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
        imageSize={imageSizeConstants.w342}
        alt="Game of Thrones"
    />);
    expect(getByTestId('image-element')).not.toHaveAttribute('src');
});

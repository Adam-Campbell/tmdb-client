import React from 'react';
import { PersonHeader } from './PersonHeader';
import { render } from '../../testUtils';

beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
        constructor() {}
        observe() { return null }
        unobserve() { return null }
        disconnect() { return null }
    }
});

test('it renders an image with the correct alt tag', () => {
    const { getByAltText } = render(<PersonHeader 
        name="Scarlett Johansson"
        imagePath="/tHMgW7Pg0Fg6HmB8Kh8Ixk6yxZw.jpg"
        biography="Scarlett Johansson, born November 22, 1984, is an American actress, model and singer."
    />);
    expect(getByAltText('Scarlett Johansson')).toBeInTheDocument();
});

test('it renders a title with the name of the person', () => {
    const { getByText } = render(<PersonHeader 
        name="Scarlett Johansson"
        imagePath="/tHMgW7Pg0Fg6HmB8Kh8Ixk6yxZw.jpg"
        biography="Scarlett Johansson, born November 22, 1984, is an American actress, model and singer."
    />);
    expect(getByText('Scarlett Johansson')).toBeInTheDocument();
});

test('it renders the biography text passed to it', () => {
    const { getByText } = render(<PersonHeader 
        name="Scarlett Johansson"
        imagePath="/tHMgW7Pg0Fg6HmB8Kh8Ixk6yxZw.jpg"
        biography="Scarlett Johansson, born November 22, 1984, is an American actress, model and singer."
    />);
    expect(getByText('Scarlett Johansson, born November 22, 1984, is an American actress, model and singer.')).toBeInTheDocument();
});
import React from 'react';
import { render } from '@testing-library/react';
import { SocialLinks } from './SocialLinks';

test('returns null if no link data is provided', () => {
    const { container } = render(<SocialLinks 
        facebook=""
        twitter=""
        instagram=""
        website=""
    />); 
    expect(container).toBeEmpty();
});

test('renders a link for each link data supplied', () => {
    const { getByTestId } = render(<SocialLinks 
        facebook="foo"
        twitter="foo"
        instagram="foo"
        website="https://foo.com"
    />);
    expect(getByTestId('facebook')).toHaveAttribute('href', 'https://facebook.com/foo');
    expect(getByTestId('twitter')).toHaveAttribute('href', 'https://twitter.com/foo');
    expect(getByTestId('instagram')).toHaveAttribute('href', 'https://instagram.com/foo');
    expect(getByTestId('website')).toHaveAttribute('href', 'https://foo.com');
});

test("omits a link if the associated link data isn't provided", () => {
    const { queryByTestId } = render(<SocialLinks 
        facebook="foo"
        twitter="foo"
        instagram=""
        website="https://foo.com"
    />);
    expect(queryByTestId('instagram')).toBe(null);
});
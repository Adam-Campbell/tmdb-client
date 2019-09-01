import React from 'react';
import PageLink from './PageLink';
import { render } from '../../testUtils';

test('it renders a link with the pageNumber supplied as its anchor text', () => {
    const { getByTestId } = render(<PageLink 
        href="/movies?page=1"
        as="/movies?page=1"
        pageNumber={1}
        isActive={false}
    />);
    expect(getByTestId('page-link')).toBeInTheDocument();
});

test('the link is rendered with the correct href', () => {
    const { getByTestId } = render(<PageLink 
        href="/movies?page=1"
        as="/movies?page=1"
        pageNumber={1}
        isActive={false}
    />);
    expect(getByTestId('page-link')).toHaveAttribute('href', '/movies?page=1');
});
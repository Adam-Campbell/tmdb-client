import React from 'react';
import { render } from '../../testUtils';
import { TagList } from './TagList';

test('it renders nothing if no tag objects are passed to it', () => {
    const { container } = render(<TagList 
        title="Genres"
        tagData={[]}
    />);
    expect(container).toBeEmpty();
});

test('it renders the title given', () => {
    const { getByText } = render(<TagList 
        title="Genres"
        tagData={[
            { id: 0, name: 'Fantasy' },
            { id: 1, name: 'Sci-Fi' }
        ]}
    />);
    expect(getByText('Genres')).toBeInTheDocument();
});

test('it renders a tag for each tag object passed to it', () => {
    const { getByText } = render(<TagList 
        title="Genres"
        tagData={[
            { id: 0, name: 'Fantasy' },
            { id: 1, name: 'Sci-Fi' }
        ]}
    />);
    expect(getByText('Fantasy')).toBeInTheDocument();
    expect(getByText('Sci-Fi')).toBeInTheDocument();
});
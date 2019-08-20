import React from 'react';
import { CreditsTable } from './CreditsTable';
import { render } from '../../testUtils';

const mockCreditsData = [
    {
        releaseYear: 2019,
        credits: [
            {
                creditDescription: 'A description for the first credit',
                creditId: 'abc',
                mediaId: 123,
                mediaType: 'movie',
                name: 'The first credit',
                releaseYear: 2019
            }
        ]
    },
    {
        releaseYear: 2018,
        credits: [
            {
                creditDescription: 'A description for the second credit',
                creditId: 'def',
                mediaId: 456,
                mediaType: 'tv',
                name: 'The second credit',
                releaseYear: 2018
            }
        ]
    }
]

test('it renders a placeholder message if an empty array is passed to it', () => {
    const { getByText } = render(<CreditsTable creditsData={[]} />);
    expect(getByText('Nothing seems to be here!')).toBeInTheDocument();
});

test('it renders the year of each credit', () => {
    const { getByText } = render(<CreditsTable creditsData={mockCreditsData} />);
    expect(getByText('2019')).toBeInTheDocument();
    expect(getByText('2018')).toBeInTheDocument();
});

test('it renders a link for each credit with the name of the media', () => {
    const { getByText } = render(<CreditsTable creditsData={mockCreditsData} />);
    expect(getByText('The first credit')).toBeInTheDocument();
    expect(getByText('The second credit')).toBeInTheDocument();
});

test('it renders some description text for each credit', () => {
    const { getByText } = render(<CreditsTable creditsData={mockCreditsData} />);
    expect(getByText('A description for the first credit')).toBeInTheDocument();
    expect(getByText('A description for the second credit')).toBeInTheDocument();
});
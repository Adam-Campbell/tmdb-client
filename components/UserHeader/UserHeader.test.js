import React from 'react';
import { UserHeader, getAverageRating } from './UserHeader';
import { render } from '@testing-library/react';

describe('getAverageRating', () => {
    test('it correctly calculates the average rating of a list of media objects', () => {
        const ratings = [
            { rating: 7 },
            { rating: 9 },
            { rating: 5 }
        ];
        expect(getAverageRating(ratings)).toBe(7);
    });
});

describe('UserHeader', () => {

    const mockedRatings = {
        shows: [
            { rating: 7 },
            { rating: 9 },
            { rating: 5 }
        ],
        movies: [
            { rating: 4 },
            { rating: 5 },
            { rating: 6 }
        ]
    };

    test('it renders an icon with the users first initial', () => {
        const { getByTestId } = render(<UserHeader 
            username="joebloggs"
            ratings={mockedRatings}
        />);
        expect(getByTestId('user-icon')).toHaveTextContent('j');
    });

    test('it renders the users username', () => {
        const { getByText } = render(<UserHeader 
            username="joebloggs"
            ratings={mockedRatings}
        />);
        expect(getByText('joebloggs')).toBeInTheDocument();
    });

    test('it renders the average movie and show ratings', () => {
        const { getByText } = render(<UserHeader 
            username="joebloggs"
            ratings={mockedRatings}
        />);
        expect(getByText('70%')).toBeInTheDocument();
        expect(getByText('50%')).toBeInTheDocument();
    });
});

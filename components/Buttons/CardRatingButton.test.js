import React from 'react';
import { CardRatingButton } from './CardRatingButton';
import { render } from '../../testUtils';

function noop() {}

test('it renders the rating passed into it', () => {
    const { getByText } = render(<CardRatingButton 
        userRating={9}
        mediaType="movie"
        id={123456}
        rateMovie={noop}
        removeMovieRating={noop}
        rateShow={noop}
        removeShowRating={noop}
    />);
    expect(getByText(9)).toBeInTheDocument();
});

import React from 'react';
import { PaginationControls } from './PaginationControls';
import { render } from '../../testUtils';
import { dataTypes, createPageLinksDataArray } from './utils';

test(`it renders a link for each page in the current window being displayed, plus links for the
head and tail where appropriate`, () => {
    const { queryAllByTestId } = render(<PaginationControls 
        currentPage={1}
        totalPages={50}
        windowSize={10}
        pageLinkHref="/movies?page=1"
        pageLinkAs="/movies?page=1"
    />);
    // One link for each page in window, plus an additinal one for the tail.
    expect(queryAllByTestId('page-link')).toHaveLength(11);
});

test(`it renders an ellipses separator component for both the head and tail, to separate them
from the main window of page links`, () => {
    const { queryAllByTestId } = render(<PaginationControls 
        currentPage={25}
        totalPages={50}
        windowSize={10}
        pageLinkHref="/movies?page=1"
        pageLinkAs="/movies?page=1"
    />);
    expect(queryAllByTestId('ellipses')).toHaveLength(2);
});
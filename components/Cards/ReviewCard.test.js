import React from 'react';
import { ReviewCard } from './ReviewCard';
import { render, fireEvent } from '../../testUtils';
import { truncateAndFormatTextBody } from '../../utils';

const loremString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacus diam, dignissim eu velit in, lobortis sodales metus. Duis aliquam nulla a orci mattis, iaculis sagittis velit lacinia. Morbi ipsum turpis, volutpat tempus eros eu, rutrum tristique justo. Proin sodales lectus justo, nec consectetur mi feugiat quis. Etiam scelerisque purus dolor, quis pharetra ante tempor convallis. Fusce commodo eleifend odio ac sollicitudin. Donec vestibulum risus id elementum fringilla.\n\nDuis vulputate arcu magna, sit amet efficitur lectus tincidunt non. Etiam ut dui in est sagittis pretium et eu magna. Nam nec nibh quis elit congue sodales a et nisl. Integer a elit ultrices, sagittis tellus quis, consequat neque. Mauris in risus vestibulum, vulputate lacus viverra, malesuada magna. Proin quis cursus arcu, id posuere arcu. Vestibulum nec suscipit tortor, non euismod mi. Nullam tincidunt non eros at consectetur. Donec lorem nisi, fermentum nec commodo eu, blandit a orci.\n\nCras sit amet felis nec elit auctor maximus. Mauris eleifend, magna quis consectetur commodo, neque enim venenatis velit, in commodo massa arcu eget sapien. Ut ac dui diam. In hac habitasse platea dictumst. Mauris lacinia neque ex, ut ultrices leo accumsan et. Sed convallis, mi in condimentum viverra, lacus neque consectetur quam, nec convallis ipsum neque vitae sem. Sed aliquam lectus vitae dolor lacinia, non interdum nulla ullamcorper. Phasellus nisi urna, faucibus ut tortor a, scelerisque tincidunt mi. Vestibulum velit nibh, faucibus pharetra pellentesque lacinia, faucibus sit amet nunc. Nulla volutpat, neque vitae tempus porttitor, enim lorem rhoncus ante, a hendrerit lectus dolor eu neque. Vestibulum ligula justo, volutpat sit amet quam vitae, ultrices mollis orci. Suspendisse suscipit sed sem quis dignissim. Quisque elementum, enim eu ultricies sagittis, augue ex posuere ligula, et ornare quam tellus in lacus.`;

const truncatedAndFormattedReview = truncateAndFormatTextBody(loremString, true, 600);
const expandedAndFormattedReview = truncateAndFormatTextBody(loremString, false, 600);

test('it renders an introduction containing the authors name', () => {
    const { getByText } = render(<ReviewCard 
        author="John Smith"
        content={loremString}
    />);
    expect(getByText('A review by John Smith')).toBeInTheDocument();
});

test('it renders a truncated review by default', () => {
    const { getByText, queryByText } = render(<ReviewCard 
        author="John Smith"
        content={loremString}
    />);
    truncatedAndFormattedReview.forEach(paragraph => {
        expect(getByText(paragraph)).toBeInTheDocument();
    });
    expect(queryByText(expandedAndFormattedReview[expandedAndFormattedReview.length-1])).toBe(null);
});

test('when the toggle button is clicked the full review is rendered', () => {
    const { getByText, getByTestId } = render(<ReviewCard 
        author="John Smith"
        content={loremString}
    />);
    const toggleButton = getByTestId('review-card-toggle-button');
    fireEvent.click(toggleButton);
    expandedAndFormattedReview.forEach(paragraph => {
        expect(getByText(paragraph)).toBeInTheDocument();
    });
});

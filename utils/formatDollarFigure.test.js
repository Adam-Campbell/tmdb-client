import { formatDollarFigure } from './formatDollarFigure';

test('converts a numeric figure into a formatted string', () => {
    expect(formatDollarFigure(1000000)).toBe('$1,000,000');
});
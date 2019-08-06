import { formatDateString } from './formatDateString';

test('if no date string is supplied, returns a placeholder string', () => {
    expect(formatDateString('')).toBe('Release date unknown');
});

test('it formats the date string given to it', () => {
    expect(formatDateString('2019-07-11')).toBe('July 11, 2019');
});

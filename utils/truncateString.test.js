import { truncateString } from './truncateString';

it('returns an empty string if the string value supplied is falsey', () => {
    expect(truncateString(undefined, 10)).toBe('');
});

it('returns the string as-is if the length of the string is not greater than the threshold', () => {
    expect(truncateString(
        'Shorter than threshold',
        50,
    )).toBe('Shorter than threshold');
});

it('truncates the string if the length of the string is greater than the threshold', () => {
    expect(truncateString(
        'This string is longer than the threshold',
        20
    )).toBe('This string is lo...');
})
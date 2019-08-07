import { formatMinutes } from './formatMinutes';

test('converts a number of minutes into a string detailing the hours and minutes', () => {
    expect(formatMinutes(97)).toBe('1hr 37m');
});

test('pads the number of minutes with a leading 0 if necessary', () => {
    expect(formatMinutes(121)).toBe('2hr 01m');
});

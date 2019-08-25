import { 
    formatTextString, 
    truncateTextStringIfNeeded, 
    truncateAndFormatTextBody 
} from './truncateAndFormatTextBody';
import * as truncateStringFns from './truncateString';

const loremString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ante finibus, aliquet odio id, egestas erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nec risus et nisl scelerisque egestas id eget nibh.\n\nPraesent pellentesque arcu imperdiet, maximus metus ut, maximus massa. Sed ut tempus nunc, sit amet aliquam sapien. Maecenas interdum, nisi nec aliquet lobortis, enim turpis finibus nisi, ut accumsan libero sapien ut massa. Maecenas dapibus efficitur orci, at varius nisl. Pellentesque sed lacus eu purus rutrum ornare et nec sapien. Integer sollicitudin purus nec iaculis lacinia. Fusce facilisis, felis laoreet ullamcorper mollis, urna eros fringilla leo, congue ullamcorper eros diam sit amet magna.`

describe('formatTextString', () => {
    test('it replaces any instances of &amp; with the character &', () => {
        expect(formatTextString('Foo &amp; Bar &amp; Baz')).toEqual(['Foo & Bar & Baz']);
    });

    test(`it splits the input string at every occurrence of a new line and returns the array
    strings, filtering out any empty strings that occur`, () => {
        expect(formatTextString(loremString)).toEqual([
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ante finibus, aliquet odio id, egestas erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nec risus et nisl scelerisque egestas id eget nibh.`,
            `Praesent pellentesque arcu imperdiet, maximus metus ut, maximus massa. Sed ut tempus nunc, sit amet aliquam sapien. Maecenas interdum, nisi nec aliquet lobortis, enim turpis finibus nisi, ut accumsan libero sapien ut massa. Maecenas dapibus efficitur orci, at varius nisl. Pellentesque sed lacus eu purus rutrum ornare et nec sapien. Integer sollicitudin purus nec iaculis lacinia. Fusce facilisis, felis laoreet ullamcorper mollis, urna eros fringilla leo, congue ullamcorper eros diam sit amet magna.`
        ]);
    });
});

describe('truncateTextStringIfNeeded', () => {
    const truncateStringMock = jest.spyOn(truncateStringFns, 'truncateString');
    test('if the shouldTruncate boolean is false it simply returns the input value', () => {
        const result = truncateTextStringIfNeeded(loremString, false, 100);
        expect(truncateStringMock).not.toHaveBeenCalled();
        expect(result).toBe(loremString);
    });
    test('if the shouldTruncate boolean is true it calls the truncateString function and returns the result', () => {
        const truncateString = truncateStringFns.truncateString;
        const result = truncateTextStringIfNeeded(loremString, true, 100);
        expect(truncateStringMock).toHaveBeenCalledTimes(1);
        expect(result).toBe(truncateString(loremString, 100));
    });
});

describe('tuncateAndFormatTextBody', () => {
    test(`it composes truncateTextStringIfNeeded with formatTextString in order to truncate and then format
    an input before returning it`, () => {
        const manuallyTruncated = truncateTextStringIfNeeded(loremString, true, 400);
        const manuallyFormatted = formatTextString(manuallyTruncated);
        expect(truncateAndFormatTextBody(loremString, true, 400)).toEqual(manuallyFormatted);
    });
});
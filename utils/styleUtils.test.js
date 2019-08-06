import { text } from './styleUtils';

test('it returns the correct default values according to the type parameter', () => {

    expect(text('heading')).toBe(`
        font-family: sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
        color: #222;
    `);

    expect(text('body')).toBe(`
        font-family: sans-serif;
        font-weight: 400;
        font-size: 1rem;
        color: #222;
    `);
});

test('it overides the default values with values specified in the second argument, if any', () => {

    expect(text('heading', {
        fontWeight: 400,
        fontSize: '1.75rem'
    })).toBe(`
        font-family: sans-serif;
        font-weight: 400;
        font-size: 1.75rem;
        color: #222;
    `);

    expect(text('body', {
        fontFamily: 'serif',
        color: '#333'
    })).toBe(`
        font-family: serif;
        font-weight: 400;
        font-size: 1rem;
        color: #333;
    `);
});

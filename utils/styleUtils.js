const textDefaults = {
    heading: {
        fontFamily: 'sans-serif',
        fontWeight: '700',
        fontSize: '1.5rem',
        color: '#222'
    },
    body: {
        fontFamily: 'sans-serif',
        fontWeight: '400',
        fontSize: '1rem',
        color: '#222'
    }
};

/**
 * A helper for creating the main styles for text throughout the app. It knows the default, cannonical styles 
 * for various types of text (heading, body etc), and will take the styles you provide in the styleObject arg
 * and merge them with the set of defaults as determined by the type argument such that the styles you provide
 * will overide the defaults. To use the default styles you only need to provide the first argument. Note that 
 * this function only provides the styles for font-family, font-weight, font-size and color. Any additional 
 * styles that are passed in will be ignored.
 * @param {String} type - the type of text
 * @param {Object} styleObject -  an object containing the styles you want to alter
 * @returns {String} - an interpolated string with containing the merged styles.
 */
export function text(type, { fontFamily, fontWeight, fontSize, color } = {}) {
    const defaults = textDefaults[type] || textDefaults.body;
    return `
        font-family: ${fontFamily || defaults.fontFamily};
        font-weight: ${fontWeight || defaults.fontWeight};
        font-size: ${fontSize || defaults.fontSize};
        color: ${color || defaults.color};
    `;
}

// const backdropSizes = [
//     'w300',
//     'w780',
//     'w1280',
//     'original'
// ];

// const posterSizes = [
//     'w92',
//     'w154',
//     'w185',
//     'w342',
//     'w500',
//     'w780',
//     'original'
// ];

export const imageSizeConstants = {
    POSTER: {
        SMALL: 'w342',
        MEDIUM: 'w500',
        LARGE: 'w780',
        ORIGINAL: 'original'
    },
    BACKDROP: {
        SMALL: 'w300',
        MEDIUM: 'w780',
        LARGE: 'w1280',
        ORIGINAL: 'original'
    }
};

/**
 * Takes in the unique path to an image and a desired image size, and returns the full Url.
 * @param {String} imagePath - the unique path to the image
 * @param {String} imageSize - the desired image size
 * @returns {String} - the full url for the image
 */
export function getImageUrl(imagePath, imageSize) {
    const root = 'http://image.tmdb.org/t/p/';
    return `${root}${imageSize}${imagePath}`;
};
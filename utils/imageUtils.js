// Internal use only
export const rootUrl = 'http://image.tmdb.org/t/p/';
const imageSizes = [
    '45',
    '92',
    '154',
    '185',
    '300',
    '342',
    '500',
    '780',
    '1280', 
];

export const imageSizeConstants = {
    w45: 'w45',
    w92: 'w92',
    w154: 'w154',
    w185: 'w185',
    w300: 'w300',
    w342: 'w342',
    w500: 'w500',
    w780: 'w780',
    w1280: 'w1280',
    faceSmall: 'w66_and_h66_face',
    faceMedium: 'w132_and_h132_face',
    faceLarge: 'w264_and_h264_face'
};

/**
 * Takes in the unique path to an image and a desired image size, and returns the full Url.
 * @param {String} imagePath - the unique path to the image
 * @param {String} imageSize - the desired image size - either one of the keys from imageSizeConstants,
 * or the string 'original' for the few occasions where you want full size image (very large).
 * @returns {String} - the full url for the image
 */
export function getImageUrl(imagePath, imageSize) {
    // Handle the case where there is no image Url provided. This is not final, 
    // eventually there will be a placeholder image Url returned instead.
    if (imagePath === null) {
        imagePath = "/dihW2yTsvQlust7mSuAqJDtqW7k.jpg";
    }
    return `${rootUrl}${imageSize}${imagePath}`;
};

/**
 * Takes the unique path to an image and creates a set of declarations to form the srcset data 
 * for this image, using the getImageUrl function for each individual declaration.
 * @param {String} imagePath - the unique path to the image 
 * @returns {String} - the srcset data for this image
 */
export function getSrcset(imagePath) {
    // constructs `http://image.tmdb.org/t/p/w{SIZE}/{IMAGEPATH} {SIZE}w, ` for each size in the
    // image sizes array
    return imageSizes.reduce((acc, size) => acc + `${getImageUrl(imagePath, `w${size}`)} ${size}w, `, '');
}
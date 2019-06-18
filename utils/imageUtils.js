// Internal use only
const rootUrl = 'http://image.tmdb.org/t/p/';
const imageSizes = [
    '45',
    '92',
    '154',
    '185',
    '300',
    '342',
    '500',
    '780',
    '1280' 
];

// Take the sizes in imageSizes and create an object where both the key and value are `w${size}`, for each
// size in imageSizes. This acts as an enum for other parts of the application to reference when they need
// to set an image size.
export const imageSizeConstants = imageSizes.reduce((acc, size) => {
    const formattedSize = `w${size}`;
    return { 
        ...acc, 
        [formattedSize]: formattedSize 
    };
}, {});


/**
 * Takes in the unique path to an image and a desired image size, and returns the full Url.
 * @param {String} imagePath - the unique path to the image
 * @param {String} imageSize - the desired image size
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
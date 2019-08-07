import { getImageUrl, rootUrl, imageSizeConstants } from './imageUtils';

test('given an imagePath and a size, returns the complete url for that image', () => {
    expect(getImageUrl('/path-to-image.jpg', imageSizeConstants.w342))
    .toBe(`${rootUrl}${imageSizeConstants.w342}/path-to-image.jpg`);
});

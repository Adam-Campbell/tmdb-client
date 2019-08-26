import { getImageUrl, imageSizeConstants } from '../../utils';

function getImageData(imagePath, alt, width = 500) {
    if (!imagePath) return false;
    const url = getImageUrl(imagePath, `w${width}`);
    return {
        url,
        width,
        alt
    }
}

export function getPageTitle(baseTitle, uniqueTitleSegment) {
    if (!uniqueTitleSegment) return baseTitle;
    return `${baseTitle} - ${uniqueTitleSegment}`;
}

export function getMediaImages(posterPath, backdropPath, title) {
    const posterImageData = getImageData(posterPath, `A Poster for ${title}`, 500);
    const backdropImageData = getImageData(backdropPath, `A promotional still for ${title}`, 780);
    let imagesArr = [];
    if (posterImageData) imagesArr.push(posterImageData);
    if (backdropImageData) imagesArr.push(backdropImageData);
    return imagesArr;
}

function getActorData({ id, character }) {
    return {
        profile: `http://localhost:3000/person/${id}`,
        role: character
    };
}

export function getMediaActors(actorsArray) {
    return actorsArray.slice(0,4)
        .map(actor => getActorData(actor));
}

export function getMediaDirectors(isMovie, crewArray, createdByArray) {
    const directorsArray = isMovie ?
        crewArray.filter(crewMember => crewMember.job === 'Director') :
        createdByArray;
    return directorsArray.map(director => `http://localhost:3000/person/${director.id}`)
}

export function splitNameApart(name) {
    const splitName = name.split(' ');
    return {
        firstName: splitName[0],
        lastName: splitName[splitName.length - 1]
    };
}

export function getPersonImages(profilePath, name) {
    if (!profilePath) return [];
    const imageData = getImageData(profilePath, name, 500);
    return [ imageData ];
}

export function getListImages(items) {
    let imageDataArray = [];
    for (let item of items) {
        if (imageDataArray.length > 2) {
            break;
        }
        if (item.backdrop_path) {
            imageDataArray.push(
                getImageData(
                    item.backdrop_path,
                    item.name || item.title
                )
            );
        }
    }
    return imageDataArray;
}

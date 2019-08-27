import { getImageUrl, imageSizeConstants } from '../../utils';

export function getImageData(imagePath, alt, width = 500) {
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
    const posterImageData = getImageData(posterPath, `A poster for ${title}`, 500);
    const backdropImageData = getImageData(backdropPath, `A promotional still for ${title}`, 780);
    let imagesArr = [];
    if (posterImageData) imagesArr.push(posterImageData);
    if (backdropImageData) imagesArr.push(backdropImageData);
    return imagesArr;
}

export function getMediaActors(actorsArray) {
    return actorsArray.slice(0,4)
        .map(actor => ({
            profile: `http://localhost:3000/person/${actor.id}`,
            role: actor.character
        }));
}

export function getMediaDirectors(isMovie, crewArray, createdByArray) {
    const directorsArray = isMovie ?
        crewArray.filter(crewMember => crewMember.job === 'Director') :
        createdByArray;
    return directorsArray.map(director => `http://localhost:3000/person/${director.id}`)
}

export function splitNameApart(name) {
    const trimmedName = name.trim();
    const splitIndex = trimmedName.indexOf(' ');
    if (splitIndex === -1) {
  	    return { 
    	    firstName: trimmedName 
        };
    }
    const firstName = trimmedName.slice(0, splitIndex);
    const lastName = trimmedName.slice(splitIndex + 1);
    return {
  	    firstName,
        lastName
    };
}

export function getPersonImage(profilePath, name) {
    if (!profilePath) return [];
    const imageData = getImageData(profilePath, name, 500);
    return [ imageData ];
}

export function getListImages(itemsArray) {
    let imageDataArray = [];
    for (let item of itemsArray) {
        if (imageDataArray.length >= 2) {
            break;
        }
        if (item.backdrop_path) {
            imageDataArray.push(
                getImageData(
                    item.backdrop_path,
                    item.name || item.title,
                    780
                )
            );
        }
    }
    return imageDataArray;
}

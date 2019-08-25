import { getImageUrl } from '../../utils';

function getImageData(imagePath, width, alt) {
    if (!imagePath) return false;
    const url = getImageUrl(imagePath, `w${width}`);
    return {
        url,
        width,
        alt
    }
}

export function getOpenGraphImages(posterPath, backdropPath, title) {
    const posterImageData = getImageData(posterPath, 500, `A Poster for ${title}`);
    const backdropImageData = getImageData(backdropPath, 780, `A promotional still for ${title}`);
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

export function getOpenGraphActors(actorsArray) {
    return actorsArray.slice(0,4)
        .map(actor => getActorData(actor));
}

export function getOpenGraphDirectors(isMovie, crewArray, createdByArray) {
    // return crewArray.filter(crewMember => crewMember.job === 'Director')
    //     .map(director => `http://localhost:3000/person/${director.id}`);
    const directorsArray = isMovie ?
        crewArray.filter(crewMember => crewMember.job === 'Director') :
        createdByArray;
    return directorsArray.map(director => `http://localhost:3000/person/${director.id}`)
}
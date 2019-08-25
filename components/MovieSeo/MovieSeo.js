import React, { useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { getImageUrl } from '../../utils';
import { connect } from 'react-redux';
import { getMovieData } from '../../reducers/movieReducer';

function getImageData(imagePath, width, alt) {
    if (!imagePath) return false;
    const url = getImageUrl(imagePath, `w${width}`);
    return {
        url,
        width,
        alt
    }
}

function getOpenGraphImages(posterPath, backdropPath, title) {
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

function getOpenGraphActors(actorsArray) {
    return actorsArray.slice(0,4).map(actor => getActorData(actor));
}

function getOpenGraphDirectors(crewArray) {
    return crewArray.filter(crewMember => crewMember.job === 'Director')
        .map(director => `http://localhost:3000/person/${director.id}`);
}

function MovieSeo({
    title,
    overview,
    posterPath,
    backdropPath,
    id,
    cast,
    crew,
    duration, 
    releaseDate,
    keywords
}) {

    const openGraphImages = useMemo(() => {
        return getOpenGraphImages(posterPath, backdropPath, title);
    }, [ posterPath, backdropPath, title ]);

    const openGraphActors = useMemo(() => {
        return getOpenGraphActors(cast);
    }, [ cast ]);

    const openGraphDirectors = useMemo(() => {
        return getOpenGraphDirectors(crew);
    }, [ crew ])

    const openGraphTags = useMemo(() => {
        return keywords.map(keyword => keyword.name);
    }, [ keywords ]);

    return (
        <NextSeo 
            openGraph={{
                title,
                description: overview,
                url: `http://localhost:3000/movie/${id}`,
                type: 'video.movie',
                site_name: 'React Movie Database',
                images: openGraphImages,
                video: {
                    actors: openGraphActors,
                    directors: openGraphDirectors,
                    duration,
                    releaseDate,
                    tags: openGraphTags
                },
            }}
        />
    );
}

function mapState(state) {
    const m = getMovieData(state);
    return {
        title: m.title,
        overview: m.overview,
        posterPath: m.poster_path,
        backdropPath: m.backdrop_path,
        id: m.id,
        cast: m.credits.cast,
        crew: m.credits.crew,
        duration: m.runtime * 60,
        releaseDate: m.release_date,
        keywords: m.keywords.keywords
    }
}

export const ConnectedMovieSeo = connect(mapState)(MovieSeo);

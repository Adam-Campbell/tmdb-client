import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { connect } from 'react-redux';
import { getMovieData } from '../../reducers/movieReducer';
import { getShowData } from '../../reducers/showReducer';
import { useRouter } from 'next/router';
import {
    getOpenGraphImages,
    getOpenGraphActors,
    getOpenGraphDirectors
} from './utils';

function MediaSeo({
    title,
    overview,
    posterPath,
    backdropPath,
    id,
    cast,
    crew,
    createdBy,
    duration, 
    releaseDate,
    keywords,
    isMovie
}) {

    const { asPath } = useRouter();

    const openGraphImages = useMemo(() => {
        return getOpenGraphImages(posterPath, backdropPath, title);
    }, [ posterPath, backdropPath, title ]);

    const openGraphActors = useMemo(() => {
        return getOpenGraphActors(cast);
    }, [ cast ]);

    const openGraphDirectors = useMemo(() => {
        return getOpenGraphDirectors(isMovie, crew, createdBy);
    }, [ isMovie, crew, createdBy ])

    const openGraphTags = useMemo(() => {
        return keywords.map(keyword => keyword.name);
    }, [ keywords ]);

    return (
        <NextSeo
            title={title}
            description={overview} 
            openGraph={{
                title,
                description: overview,
                url: `http://localhost:3000${asPath}`,
                type: isMovie ? 'video.movie' : 'video.tv_show',
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

MediaSeo.propTypes = {
    isMovie: PropTypes.bool
}

function mapState(state, ownProps) {
    const { isMovie } = ownProps;
    const data = isMovie ? getMovieData(state) : getShowData(state);
    return {
        title: isMovie ? data.title : data.name,
        overview: data.overview,
        posterPath: data.poster_path,
        backdropPath: data.backdrop_path,
        id: data.id,
        cast: data.credits.cast,
        crew: data.credits.crew,
        createdBy: data.created_by,
        duration: (isMovie ? data.runtime : data.episode_run_time[0]) * 60,
        releaseDate: isMovie ? data.release_date : data.first_air_date,
        keywords: isMovie ? data.keywords.keywords : data.keywords.results
    };
}

export const ConnectedMediaSeo = connect(mapState)(MediaSeo);

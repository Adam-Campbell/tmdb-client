import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getMovieSubNavData, getShowSubNavData } from '../../utils';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
import TitleBlock from '../TitleBlock';
import { MediaSeo } from '../Seo';
import MinimalHeader from '../MinimalHeader';
import SubNav from '../SubNav';

const MediaCardContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
`;

export function MediaListView({ 
    id,
    mediaTitle,
    pageTitle,
    posterPath, 
    backdropPath, 
    items, 
    isMovie 
}) {

    const subNavData = useMemo(() => {
        return isMovie ? getMovieSubNavData(id) : getShowSubNavData(id);
    }, [ isMovie, id ]);

    return (
        <>
            <MediaSeo isMovie={isMovie} uniqueTitleSegment={pageTitle} />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={mediaTitle}
                backHref={isMovie ? '/movie/[id]' : '/show/[id]'}
                backAs={isMovie ? `/movie/${id}` : `/show/${id}`}
            />
            <SubNav 
                navData={subNavData}
                navLabel={
                    `Navigation links for pages related to the current ${isMovie ? 'movie' : 'TV show'}`
                }
            />
            <TitleBlock title={pageTitle} headingTag="h2" />
            <MediaCardContainer>
                {items.map(item => (
                    <MediaCard 
                        key={item.id}
                        id={item.id}
                        title={item.title || item.name}
                        releaseDate={item.release_date || item.first_air_date}
                        averageRating={item.vote_average}
                        backdropPath={item.backdrop_path}
                        posterPath={item.poster_path}
                        overview={item.overview}
                        urlSubpath={isMovie ? '/movie' : '/show'}
                    />  
                ))}
            </MediaCardContainer>
        </>
    );
}

MediaListView.propTypes = {
    id: PropTypes.number.isRequired,
    mediaTitle: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    backdropPath: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    isMovie: PropTypes.bool.isRequired
};

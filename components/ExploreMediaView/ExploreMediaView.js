import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitleBlock from '../TitleBlock';
import { NextSeo } from 'next-seo';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
import PaginationControls from '../PaginationControls';

const Section = styled.section`
    min-height: 100vh;
`;

export function ExploreMediaView({ 
    title,
    mediaData,
    currentPage,
    pageLinkAs,
    pageLinkHref,
}) {

    return (
        <Section>
            <NextSeo 
                title={title}
                description={`${title} on React Movie Database, the user editable database for movies and TV shows.`}
            />
            <TitleBlock title={title} />
            <Row>
                {mediaData.map((card, idx) => (
                    <MediaCard 
                        key={card.id}
                        id={card.id}
                        title={card.title || card.name}
                        releaseDate={card.release_date || card.first_air_date}
                        averageRating={card.vote_average}
                        backdropPath={card.backdrop_path}
                        posterPath={card.poster_path}
                        overview={card.overview}
                        urlSubpath={card.title ? '/movie' : '/show'}
                    />
                ))}
                <PaginationControls 
                    currentPage={currentPage} 
                    pageLinkHref={pageLinkHref}
                    pageLinkAs={pageLinkAs}
                />
            </Row>
        </Section>
    )
}

ExploreMediaView.propTypes = {
    title: PropTypes.string.isRequired,
    mediaData: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentPage: PropTypes.number.isRequired,
    pageLinkHref: PropTypes.string.isRequired,
    pageLinkAs: PropTypes.string.isRequired
};
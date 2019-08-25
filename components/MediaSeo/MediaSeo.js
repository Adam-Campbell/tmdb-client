import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { getImageUrl, imageSizeConstants } from '../../utils';

function getOpenGraphImages(imagePath, title) {
    if (!imagePath) return null;
    const w500ImageUrl = getImageUrl(imagePath, imageSizeConstants.w500);
    const w780ImageUrl = getImageUrl(imagePath, imageSizeConstants.w780);
    return [
        {
            url: w500ImageUrl,
            width: 500,
            alt: title
        },
        {
            url: w780ImageUrl,
            width: 780,
            alt: title
        },
    ];
}

export function MediaSeo({
    title,
    description,
    //id,
    url,
    imagePath
}) {

    const openGraphImages = useMemo(() => {
        return getOpenGraphImages(imagePath, title);
    }, [ imagePath, title ])

    return (
        <NextSeo 
            openGraph={{
                title,
                description,
                url,
                type: 'video.movie',
                site_name: 'https://react-movie-database.com',
                images: openGraphImages
            }}
        />
    )
}

MediaSeo.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // id: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.number
    // ]).isRequired,
    url: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
};
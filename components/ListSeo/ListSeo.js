import React, { useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { connect } from 'react-redux';
import { getListData } from '../../reducers/listReducer';
import { useRouter } from 'next/router';
import { getImageUrl, imageSizeConstants } from '../../utils';

function getImageData(imagePath, name) {
    const url = getImageUrl(imagePath, imageSizeConstants.w500);
    return {
        url,
        width: 500,
        alt: name
    }
}

function getOpenGraphImages(items) {
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


function ListSeo({ 
    name = '', 
    description = 'A user made list of movies and TV shows', 
    items 
}) {

    const { asPath } = useRouter();

    const openGraphImages = useMemo(() => {
        return getOpenGraphImages(items);
    }, [ items ]);

    return (
        <NextSeo 
            title={name}
            description={description}
            openGraph={{
                title: name,
                description,
                url: `http://localhost:3000${asPath}`,
                type: 'website',
                images: openGraphImages
            }}
            twitter={{
                cardType: 'summary',
                site: '@reactmoviedb'
            }}
        />
    );
}

function mapState(state) {
    const l = getListData(state);
    return {
        name: l.name, 
        description: l.description,
        items: l.items
    }
}

export const ConnectedListSeo = connect(mapState)(ListSeo);

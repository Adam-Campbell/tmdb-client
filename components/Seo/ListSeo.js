import React, { useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { connect } from 'react-redux';
import { getListData } from '../../reducers/listReducer';
import { useRouter } from 'next/router';
import { getListImages } from './utils';

function ListSeo({ 
    name = '', 
    description = 'A user made list of movies and TV shows', 
    items 
}) {

    const { asPath } = useRouter();

    const openGraphImages = useMemo(() => {
        return getListImages(items);
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

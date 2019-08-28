import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListViewHeader from '../ListViewHeader';
import InfiniteVirtualMediaList from '../InfiniteVirtualMediaList';
import { NextSeo } from 'next-seo';

const Section = styled.section`
    min-height: 100vh;
`;

export function ExploreMediaPage({ 
    title,
    initialData,
    getDataFn,
    subcategory
}) {

    const [ showList, setShowList ] = useState(false);

    useEffect(() => {
        setShowList(true);
    }, []);

    return (
        <Section>
            <NextSeo 
                title={title}
                description={`${title} on React Movie Database, the user editable database for movies and TV shows.`}
            />
            <ListViewHeader title={title} />
            {showList && <InfiniteVirtualMediaList 
                initialData={initialData}
                getDataFn={getDataFn}
                key={subcategory}
            />}
        </Section>
    )
}

ExploreMediaPage.propTypes = {
    title: PropTypes.string.isRequired,
    initialData: PropTypes.arrayOf(PropTypes.object).isRequired,
    getDataFn: PropTypes.func.isRequired,
    subcategory: PropTypes.string.isRequired
};
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { connect } from 'react-redux';
import { getPersonData } from '../../reducers/personReducer';
import { useRouter } from 'next/router';
import {
   splitNameApart, 
   getPersonImages,
   getPageTitle
} from './utils';
 
function PersonSeo({
    uniqueTitleSegment,
    id,
    name,
    profilePath,
    biography,
    gender
}) {

    const { asPath } = useRouter();

    const title = useMemo(() => {
        return getPageTitle(name, uniqueTitleSegment);
    }, [ name, uniqueTitleSegment ])

    const { firstName, lastName } = useMemo(() => {
        return splitNameApart(name);
    }, [ name ]);

    const imageDataArray = useMemo(() => {
        return getPersonImages(profilePath, name);
    }, [ profilePath, name ]);

    return (
        <NextSeo 
            title={title}
            description={biography}
            openGraph={{
                title,
                description: biography,
                url: `http://localhost:3000${asPath}`,
                type: 'profile',
                site_name: 'React Movie Database',
                images: imageDataArray,
                profile: {
                    firstName,
                    lastName
                }
            }}
            twitter={{
                cardType: 'summary',
                site: '@reactmoviedb'
            }}
        />
    );
}

PersonSeo.propTypes = {
    // Used to differentiate the different subroutes, this prop is appended to the name to
    // get the full title. Passing in 'Profile Images' will output ${name} - Profile Images
    uniqueTitleSegment: PropTypes.string
}

function mapState(state) {
    const p = getPersonData(state);
    return {
        id: p.id,
        name: p.name,
        profilePath: p.profile_path,
        biography: p.biography,
        gender: p.gender === 2 ? 'male' : 'female',
    }
}

export const ConnectedPersonSeo = connect(mapState)(PersonSeo);
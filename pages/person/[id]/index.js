import React, { useMemo } from 'react';
import { getPersonSubNavData } from '../../../utils';
import SubNav from '../../../components/SubNav';
import PersonHeader from '../../../components/PersonHeader';
import { 
    TwoColLayoutContainer,
    TwoColLayoutRow,
    MainCol,
    SidebarCol
} from '../../../components/Layout';
import SocialLinks from '../../../components/SocialLinks';
import ReviewPod from '../../../components/ReviewPod';
import SidebarEntry from '../../../components/SidebarEntry';
import PersonTopCreditsCardRow from '../../../components/PersonTopCreditsCardRow';
import InlineGalleryRow from '../../../components/InlineGalleryRow';
import { fetchPerson } from '../../../actions';
import { getPersonData } from '../../../reducers/personReducer';
import { connect } from 'react-redux';
import withErrorHandling from '../../../components/withErrorHandling';
import { PersonSeo } from '../../../components/Seo';

export async function getInitialPersonProps({ query, req, store }) {
    try {
        const { id } = query;
        await store.dispatch(fetchPerson(id));
        return {};
    } catch (error) {
        return {
            hasError: true,
            errorCode: error.message
        };
    }
}

function Person({
    id,
    name,
    profilePath,
    biography,
    credits,
    profileImages,
    externalIds,
    website,
    knownFor,
    gender,
    knownCredits,
    birthday,
    deathday,
    placeOfBirth
}) {

    const personSubNavData = useMemo(() => {
        return getPersonSubNavData(id);
    }, [ id ]);

    return (
        <>
            <PersonSeo />
            <PersonHeader 
                key={id}
                name={name}
                imagePath={profilePath}
                biography={biography}
            />
            <SubNav 
                navData={personSubNavData} 
                alignCenter={true}
                navLabel="Navigation links for pages related to the current person" 
            />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <PersonTopCreditsCardRow 
                            title="Known for"
                            creditsData={credits}
                            linkText="See all credits"
                            linkDestinationAs={`/person/${id}/credits`}
                            linkDestinationHref="/person[id]/credits"
                        />
                        <InlineGalleryRow 
                            imagesData={profileImages}
                            title="Profile images"
                            linkText="See all images"
                            linkDestinationAs={`/person/${id}/images`}
                            linkDestinationHref="/person/[id]/images"
                            name={name}
                        />
                    </MainCol>
                    <SidebarCol>
                        <section>
                            <SocialLinks 
                                facebook={externalIds.facebook_id}
                                twitter={externalIds.twitter_id}
                                instagram={externalIds.instagram_id}
                                website={website}
                            />
                            <SidebarEntry 
                                title="Known for"
                                value={knownFor}
                            />
                            <SidebarEntry 
                                title="Gender"
                                value={gender}
                            />
                            <SidebarEntry 
                                title="Known credits"
                                value={knownCredits}
                            />
                            <SidebarEntry 
                                title="Date of birth"
                                value={birthday}
                            />
                            <SidebarEntry 
                                title="Date of death"
                                value={deathday}
                            />
                            <SidebarEntry 
                                title="Place of birth"
                                value={placeOfBirth}
                            />
                        </section>
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </>
    );
}

function mapState(state) {
    const p = getPersonData(state);
    return {
        id: p.id,
        name: p.name,
        profilePath: p.profile_path,
        biography: p.biography,
        credits: p.known_for_department === 'Acting' ? 
                 p.combined_credits.cast : 
                 p.combined_credits.crew,
        profileImages: p.images.profiles,
        externalIds: p.external_ids,
        website: p.homepage,
        knownFor: p.known_for_department,
        gender: p.gender === 2 ? 'Male' : 'Female',
        knownCredits: p.combined_credits.cast.length + p.combined_credits.crew.length,
        birthday: p.birthday,
        deathday: p.deathday, 
        placeOfBirth: p.place_of_birth
    };
}

const PersonPage = withErrorHandling(
    connect(mapState)(Person)
);

PersonPage.getInitialProps = getInitialPersonProps;

export default PersonPage;

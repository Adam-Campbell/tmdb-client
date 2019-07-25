import React from 'react';
import { getPersonDetails } from '../../Api';
import { getPersonSubNavData } from '../../utils';
import SubNav from '../../components/SubNav';
import PersonHeader from '../../components/PersonHeader';
import { 
    TwoColLayoutContainer,
    TwoColLayoutRow,
    MainCol,
    SidebarCol
} from '../../components/Layout';
import SocialLinks from '../../components/SocialLinks';
import ReviewPod from '../../components/ReviewPod';
import SidebarEntry from '../../components/SidebarEntry';
import PersonTopCreditsCardRow from '../../components/PersonTopCreditsCardRow';
import InlineGalleryRow from '../../components/InlineGalleryRow';

import { fetchPerson } from '../../actions';
import { getPersonData } from '../../reducers/personReducer';
import { connect } from 'react-redux';

function Person(props) {
    
    const personSubNavData = getPersonSubNavData(props.id);

    return (
        <div>
            <PersonHeader 
                key={props.id}
                name={props.name}
                imagePath={props.profilePath}
                biography={props.biography}
            />
            <SubNav navData={personSubNavData} alignCenter={true} />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <PersonTopCreditsCardRow 
                            title="Known for"
                            creditsData={props.credits}
                            linkText="See all credits"
                            linkDestinationAs={`/person/${props.id}/credits`}
                            linkDestinationHref={`/person/credits?id=${props.id}`}
                        />
                        <InlineGalleryRow 
                            imagesData={props.profileImages}
                            title="Profile images"
                            linkText="See all images"
                            linkDestinationAs={`/person/${props.id}/images`}
                            linkDestinationHref={`/person/images?id=${props.id}`}
                        />
                    </MainCol>
                    <SidebarCol>
                        <SocialLinks 
                            facebook={props.externalIds.facebook_id}
                            twitter={props.externalIds.twitter_id}
                            instagram={props.externalIds.instagram_id}
                            website={props.website}
                        />
                        <SidebarEntry 
                            title="Known for"
                            value={props.knownFor}
                        />
                        <SidebarEntry 
                            title="Gender"
                            value={props.gender}
                        />
                        <SidebarEntry 
                            title="Known credits"
                            value={props.knownCredits}
                        />
                        <SidebarEntry 
                            title="Date of birth"
                            value={props.birthday}
                        />
                        <SidebarEntry 
                            title="Date of death"
                            value={props.deathday}
                        />
                        <SidebarEntry 
                            title="Place of birth"
                            value={props.placeOfBirth}
                        />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
    );
}

Person.getInitialProps = async ({ query, req, store }) => {
    const { id } = query;
    await store.dispatch(fetchPerson(id));
    return {};
};

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

export default connect(mapState)(Person);
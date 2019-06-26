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
import { SidebarEntry } from '../../components/SidebarEntry/SidebarEntry';
import PersonTopCreditsCardRow from '../../components/PersonTopCreditsCardRow';
import InlineGalleryRow from '../../components/InlineGalleryRow';
/*

    - can reuse subnav component, but will need to create a new function to generate the data.

    - cannot reuse the same header component. 

*/

function Person({ results }) {
    const personSubNavData = getPersonSubNavData(results.id);

    //const creditsByPopularity = results.combined_credits.cast.sort((a, b) => b.popularity - a.popularity);
    //console.log(creditsByPopularity);

    return (
        <div>
            <PersonHeader 
                key={results.id}
                name={results.name}
                imagePath={results.profile_path}
                biography={results.biography}
            />
            <SubNav navData={personSubNavData} />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <PersonTopCreditsCardRow 
                            title="Known for"
                            creditsData={results.known_for_department === 'Acting' ? 
                                results.combined_credits.cast :
                                results.combined_credits.crew
                            }
                            linkText="See all credits"
                            linkDestinationAs={`/person/${results.id}/credits`}
                            linkDestinationHref={`/person/credits?id=${results.id}`}
                        />
                        <InlineGalleryRow 
                            imagesData={results.images.profiles}
                            title="Profile images"
                            linkText="See all images"
                            linkDestinationAs={`/person/${results.id}/images`}
                            linkDestinationHref={`/person/images?id=${results.id}`}
                        />
                    </MainCol>
                    <SidebarCol>
                        <SocialLinks 
                            facebook={results.external_ids.facebook_id}
                            twitter={results.external_ids.twitter_id}
                            instagram={results.external_ids.instagram_id}
                            website={results.homepage}
                        />
                        <SidebarEntry 
                            title="Known for"
                            value={results.known_for_department}
                        />
                        <SidebarEntry 
                            title="Gender"
                            value={results.gender === 2 ? 'Male' : 'Female'}
                        />
                        <SidebarEntry 
                            title="Known credits"
                            value={results.combined_credits.cast.length + results.combined_credits.crew.length}
                        />
                        <SidebarEntry 
                            title="Date of birth"
                            value={results.birthday}
                        />
                        <SidebarEntry 
                            title="Date of death"
                            value={results.deathday}
                        />
                        <SidebarEntry 
                            title="Place of birth"
                            value={results.place_of_birth}
                        />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
    );
}

Person.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getPersonDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default Person;
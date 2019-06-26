import React, { useState } from 'react';
import styled from 'styled-components';
import { getPersonDetails } from '../../Api';
import { getPersonSubNavData, transformCreditsData } from '../../utils';
import SubNav from '../../components/SubNav';
import MinimalHeader from '../../components/MinimalHeader';
import Switch from '../../components/Switch';
import { Row } from '../../components/Layout'; 
import ListViewHeader from '../../components/ListViewHeader';
import CreditsTable from '../../components/CreditsTable'

const mediaTypeRadioButtonsData = [
    {
        name: 'Both',
        value: 'both',
        id: 'media-type-both'
    },
    {
        name: 'Movie',
        value: 'movie',
        id: 'media-type-movie'
    },
    {
        name: 'TV',
        value: 'tv',
        id: 'media-type-tv'
    },
];

const roleTypeRadioButtonsData = [
    {
        name: 'Both',
        value: 'both',
        id: 'role-type-both'
    },
    {
        name: 'Cast',
        value: 'cast',
        id: 'role-type-cast'
    },
    {
        name: 'Crew',
        value: 'crew',
        id: 'role-type-crew'
    },
];

const ContentRow = styled(Row)`
    display: flex;
    flex-direction: column;
    @media(min-width: 768px) {
        flex-direction: row;
    }
`;

const ControlsCol = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
    @media(min-width: 768px) {
        width: 280px;
        padding: 40px 20px 40px 0;
    }
`;

const SwitchContainer = styled.div`
    width: 100%;
`;

const MainCol = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    @media(min-width: 768px) {
        padding: 40px 0 40px 20px;
        width: calc(100% - 280px);
    }
`;


function Credits({ results }) {
    const [ roleType, setRoleType ] = useState('both');
    const [ mediaType, setMediaType ] = useState('both');
    const personSubNavDetails = getPersonSubNavData(results.id);
    
    const creditsToRender = transformCreditsData(results.combined_credits, roleType, mediaType);
    
    return (
        <div>
            <MinimalHeader 
                imagePath={results.profile_path}
                name={results.name}
                backHref={`/person?id=${results.id}`}
                backAs={`/person/${results.id}`}
            />
            <SubNav navData={personSubNavDetails} />
            <ListViewHeader title="Credits" />
            <ContentRow>
                <ControlsCol>
                    <SwitchContainer>
                        <Switch 
                            groupLabel="Role Type"
                            groupName="role-type"
                            radioButtonsData={roleTypeRadioButtonsData}
                            currentValue={roleType}
                            handleChange={setRoleType}
                        />
                    </SwitchContainer>
                    <SwitchContainer>
                        <Switch 
                            groupLabel="Media Type"
                            groupName="media-type"
                            radioButtonsData={mediaTypeRadioButtonsData}
                            currentValue={mediaType}
                            handleChange={setMediaType}
                        />
                    </SwitchContainer>
                </ControlsCol>
                <MainCol>
                    <CreditsTable 
                        creditsData={creditsToRender}
                    />
                </MainCol>
            </ContentRow>
        </div>
    );
}

Credits.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getPersonDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default Credits;
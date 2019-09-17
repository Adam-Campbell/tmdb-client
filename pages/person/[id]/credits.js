import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { getPersonSubNavData, transformCreditsData } from '../../../utils';
import SubNav from '../../../components/SubNav';
import MinimalHeader from '../../../components/MinimalHeader';
import Switch from '../../../components/Switch';
import { Row } from '../../../components/Layout'; 
import TitleBlock from '../../../components/TitleBlock';
import CreditsTable from '../../../components/CreditsTable';
import { fetchPerson } from '../../../actions';
import { getPersonData } from '../../../reducers/personReducer';
import { connect } from 'react-redux';
import { getInitialPersonProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import { PersonSeo } from '../../../components/Seo';

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
    padding: ${({ theme }) => theme.getSpacing(3, 0)};
    @media(min-width: 768px) {
        width: 280px;
        padding: ${({ theme }) => theme.getSpacing(4, 3, 4, 0)};
    }
`;

const SwitchContainer = styled.div`
    width: 100%;
`;

const MainCol = styled.div`
    padding: ${({ theme }) => theme.getSpacing(3, 0)};
    @media(min-width: 768px) {
        padding: ${({ theme }) => theme.getSpacing(4, 0, 4, 3)};
        width: calc(100% - 280px);
    }
`;


function Credits({ id, name, profilePath, credits }) {
    const [ roleType, setRoleType ] = useState('both');
    const [ mediaType, setMediaType ] = useState('both');

    const personSubNavDetails = useMemo(() => {
        return getPersonSubNavData(id);
    }, [ id ]);
    
    const creditsToRender = useMemo(() => {
        return transformCreditsData(credits, roleType, mediaType);
    }, [ credits, roleType, mediaType ]);


    return (
        <>
            <PersonSeo uniqueTitleSegment="Credits" />
            <MinimalHeader 
                imagePath={profilePath}
                name={name}
                backHref={`/person/[id]`}
                backAs={`/person/${id}`}
                isPersonImage={true}
            />
            <SubNav 
                navData={personSubNavDetails} 
                alignCenter={true}
                navLabel="Navigation links for pages related to the current person" 
            />
            <TitleBlock title="Credits" headingTag="h2" />
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
        </>
    );
}

function mapState(state) {
    const p = getPersonData(state);
    return {
        id: p.id,
        name: p.name,
        profilePath: p.profile_path,
        credits: p.combined_credits
    };
}

const CreditsPage = withErrorHandling(
    connect(mapState)(Credits)
);

CreditsPage.getInitialProps = getInitialPersonProps;

export default CreditsPage;

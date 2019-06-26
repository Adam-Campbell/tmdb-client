import React from 'react';
import styled from 'styled-components';
import { getPersonDetails } from '../../Api';
import { getPersonSubNavData } from '../../utils';
import SubNav from '../../components/SubNav';
import MinimalHeader from '../../components/MinimalHeader';
import ListViewHeader from '../../components/ListViewHeader';
import { Row } from '../../components/Layout';
import { getImageUrl, imageSizeConstants } from '../../utils';

/*

    - can reuse subnav component, but will need to create a new function to generate the data.

    - can reuse the same minimal header component. 

*/

const ThumbsContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
`;

const Thumb = styled.img`
    margin: 10px;
    width: calc(50% - 20px);
    @media(min-width: 550px) {
        width: calc(33.33333% - 20px);
    }
    @media(min-width: 768px) {
        width: calc(25% - 20px);
    }
    @media(min-width: 960px) {
        width: calc(20% - 20px);
    }
`;

function Images({ results }) {
    const personSubNavData  = getPersonSubNavData(results.id);
    return (
        <div>
            <MinimalHeader 
                imagePath={results.profile_path}
                name={results.name}
                backHref={`/person?id=${results.id}`}
                backAs={`/person/${results.id}`}
            />
            <SubNav navData={personSubNavData} />
            <ListViewHeader title="Profile Images" />
            <Row>
                <ThumbsContainer>
                    {results.images.profiles.map(image => (
                        <Thumb 
                            key={image.file_path}
                            src={getImageUrl(image.file_path, imageSizeConstants.w500)}
                            onClick={() => console.log(image)}
                        />
                    ))}
                </ThumbsContainer>
            </Row>
        </div>
    );
}

Images.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getPersonDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
}

export default Images;

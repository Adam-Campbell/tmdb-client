import React from 'react';
import styled from 'styled-components';
import { getPersonDetails } from '../../Api';
import { getPersonSubNavData } from '../../utils';
import SubNav from '../../components/SubNav';
import MinimalHeader from '../../components/MinimalHeader';

/*

    - can reuse subnav component, but will need to create a new function to generate the data.

    - can reuse the same minimal header component. 

*/

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

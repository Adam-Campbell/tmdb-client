import React from 'react';
import { getShowDetails } from '../Api';

function Show(props) {
    return (
        <div>
            <h1>This is the show details page!</h1>
        </div>
    );
}

Show.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getShowDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default Show;

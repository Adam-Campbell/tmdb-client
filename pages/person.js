import React from 'react';
import { getPersonDetails } from '../Api';

function Person(props) {
    return (
        <div>
            <h1>This is the person details page</h1>
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
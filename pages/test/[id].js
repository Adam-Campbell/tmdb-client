import React from 'react';

function Id({ id }) {
    return <p>The ID is {id}</p>
}

Id.getInitialProps = async ({ query }) => {
    const { id } = query;
    return { id };
}

export default Id;
import React from 'react';

export default function FooID({ id }) {
    return (
        <div>
            <h1>This is the page for Foo with an ID</h1>
            <p>And the ID is {id}</p>
        </div>
    );
}

FooID.getInitialProps = async ({ query }) => {
    const { id } = query;
    return { id };
}
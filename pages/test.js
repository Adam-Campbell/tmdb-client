import React, { useState } from 'react';
import styled from 'styled-components';
import { Row } from '../components/Layout';
import ListBox from '../components/ListBox';

const PaddedRow = styled(Row)`
    padding-top: 250px;
    padding-bottom: 250px;
`;

const imageTypes = [
    { value: 'poster', name: 'Poster' },
    { value: 'backdrop', name: 'Backdrop' } 
];

export default function Test(props) {
    const [ currentImageType, setImageType ] = useState(imageTypes[0]);
    return (
        <PaddedRow>
            <ListBox 
                items={imageTypes}
                currentValue={currentImageType}
                setValue={setImageType}
                shouldBuffer={false}
                shouldInlineLabel={true}
                labelText="Image type: "
            />
        </PaddedRow>
    ); 
}
import React from 'react';
import styled from 'styled-components';
import { Row } from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

const PaddedRow = styled(Row)`
    padding-top: 200px;
    padding-bottom: 200px;
`;

export default function LoadingSpinnerPage(props) {
    return (
        <PaddedRow>
            <LoadingSpinner 
                shouldHaveBackground={true}
                scale={0.8}
            />
        </PaddedRow>
    );
} 
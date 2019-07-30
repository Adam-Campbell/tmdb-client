import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';
import useExpand from '../useExpand';

const Paragraph = styled.p`
    ${text('body')}
`;

const ToggleButton = styled.button`
    ${text('body', { fontWeight: 700, color: '#fff' })}
    background: #43cbe8;
    padding: 10px;
    border: none;
    border-radius: 3px;
`;

/*

If total bio length is below some threshold, we don't need any state, we don't need to be able
to expand or collapse the bio, and so we don't need to the truncated version of the bio - 

*/

function formatBioString(bioString) {
    return bioString.replace('&amp;', '&')
            .split('\n')
            .filter(el => el !== '');
}

export default function Biography({ biography }) {

    const truncationThreshold = 600;
    const isExpandable = biography.length > truncationThreshold;

    //const [ isExpanded, setExpanded ] = useState(false);

    const {
        isExpanded, 
        anchorRef,
        handleToggleClick
    } = useExpand();

    const bioData = useMemo(() => {
        const bioString = (isExpandable && !isExpanded)
            ? biography.slice(0, truncationThreshold - 3) + '...'
            : biography;
            
        return formatBioString(bioString);
    }, [ biography, isExpanded, isExpandable ]);

    return (
        <div>
            {bioData.map((paragraph, idx) => (
                <Paragraph key={idx}>{paragraph}</Paragraph>
            ))}
            {isExpandable && (
                <ToggleButton
                    ref={anchorRef} 
                    onClick={handleToggleClick}
                >
                    {isExpanded ? 'Read less' : 'Read More'}
                </ToggleButton>
            )}
        </div>
    );
}

Biography.propTypes = {
    biography: PropTypes.string.isRequired
};
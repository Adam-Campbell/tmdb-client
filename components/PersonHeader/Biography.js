import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';
import useExpand from '../useExpand';
import { Button } from '../Buttons';

const Paragraph = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

function formatBioString(bioString) {
    return bioString.replace('&amp;', '&')
            .split('\n')
            .filter(el => el !== '');
}

export default function Biography({ biography }) {

    const truncationThreshold = 600;
    const isExpandable = biography.length > truncationThreshold;

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
                <Button
                    buttonRef={anchorRef} 
                    onClick={handleToggleClick}
                >
                    {isExpanded ? 'Read less' : 'Read More'}
                </Button>
            )}
        </div>
    );
}

Biography.propTypes = {
    biography: PropTypes.string.isRequired
};
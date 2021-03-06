import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { truncateAndFormatTextBody } from '../../utils';
import useExpand from '../useExpand';
import { Button } from '../Buttons';

const Paragraph = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

export default function Biography({ biography }) {

    const truncationThreshold = 600;
    const isExpandable = biography.length > truncationThreshold;

    const {
        isExpanded, 
        anchorRef,
        handleToggleClick
    } = useExpand();

    const bioData = useMemo(() => {
        return truncateAndFormatTextBody(
            biography, 
            (isExpandable && !isExpanded),
            truncationThreshold
        );
    }, [ biography, isExpanded, isExpandable, truncationThreshold ]);

    return (
        <div>
            {bioData.map((paragraph, idx) => (
                <Paragraph data-testid="biography-text" key={idx}>{paragraph}</Paragraph>
            ))}
            {isExpandable && (
                <Button
                    buttonRef={anchorRef} 
                    onClick={handleToggleClick}
                    testId="expand-button"
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

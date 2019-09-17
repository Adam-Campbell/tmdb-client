import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import {
    StyledMinimalHeader,
    BackdropImageHolder,
    BackdropImageOverlay,
    MinimalHeaderRow,
    Image,
    Title,
    BackLink,
    BackIcon
} from './styledElements';

export function MinimalHeader({ 
    imagePath, 
    name, 
    backHref, 
    backAs, 
    backText = 'Back to main',
    isPersonImage,
    backdropPath
}) {

    const backdropUrl = useMemo(() => {
        if (!backdropPath) return '';
        return getImageUrl(backdropPath, 'original');
    }, [ backdropPath ])
    
    return (
        <StyledMinimalHeader>
            {backdropUrl && <BackdropImageHolder imageUrl={backdropUrl} />}
            <BackdropImageOverlay hasImage={Boolean(backdropUrl)}>
                <MinimalHeaderRow>
                    <Image 
                        imagePath={imagePath}
                        imageSize={imageSizeConstants.w185}
                        alt={name}
                        isPersonImage={isPersonImage}
                    />
                    <div>
                        <Title>{name}</Title>
                        <Link href={backHref} as={backAs} passHref>
                            <BackLink>
                                <BackIcon />
                                {backText}
                            </BackLink>
                        </Link>
                    </div>
                </MinimalHeaderRow>
            </BackdropImageOverlay>
        </StyledMinimalHeader>
    );
}

MinimalHeader.propTypes = {
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    backHref: PropTypes.string.isRequired,
    backAs: PropTypes.string.isRequired,
    backText: PropTypes.string,
    isPersonImage: PropTypes.bool,
    backdropPath: PropTypes.string
};

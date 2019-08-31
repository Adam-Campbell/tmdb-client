import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import { LongArrowAltLeft } from 'styled-icons/fa-solid';
import SmartImage from '../SmartImage';
import { cover } from 'polished';

const StyledMinimalHeader = styled.section`
    position: relative;
`;

const BackdropImageHolder = styled.div`
    ${cover()}
    width: 100%;
    height: 100%;
    background: ${({ imageUrl }) => `url('${imageUrl}')`};
    background-size: cover;
    background-position: center;
    filter: grayscale(75%) contrast(110%);
`;

const BackdropImageOverlay = styled.div`
    background: ${({ theme, hasImage }) => hasImage ? theme.colors.overlayStrong : theme.gradients.primary};
    position: relative;
`;

const MinimalHeaderRow = styled(Row)`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(3, 0)};
`;

const Image = styled(SmartImage)`
    width: 85px;
    height: 127.5px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    flex-shrink: 0;
`;


const Title = styled.h1`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.heading.lg};
    margin: ${({ theme }) => theme.getSpacing(0, 0, 2, 0)};
`;

const BackLink = styled.a`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.uiSecondary};
    }
`;

const BackIcon = styled(LongArrowAltLeft)`
    width: 25px;
    max-height: 25px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;

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

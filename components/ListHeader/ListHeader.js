import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import { cover } from 'polished';

const StyledListHeader = styled.div`
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
    background: ${({ theme, hasImage }) => hasImage ? theme.colors.overlayStrong : theme.colors.complimentary};
    position: relative;
`;

const HeaderRow = styled(Row)`
    padding: ${({ theme }) => theme.getSpacing(4, 0)};
`;

const ListName = styled.h1`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.heading.lg};
    margin: ${({ theme }) => theme.getSpacing(2, 0)};
`;

const Creator = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    color: ${({ theme }) => theme.colors.primary};
    span {
        color: ${({ theme }) => theme.colors.white};
        font-weight: 300;
        margin-right: ${({ theme }) => theme.getSpacing(1)};
    }
`;

const ListDescription = styled.p`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

export function ListHeader({ name, createdBy, description, backdropPath }) {
    const imageUrl = useMemo(() => {
        if (!backdropPath) return '';
        return getImageUrl(backdropPath, 'original');
    }, [ backdropPath ]);

    return (
        <StyledListHeader>
            {imageUrl && <BackdropImageHolder imageUrl={imageUrl} />}
            <BackdropImageOverlay hasImage={Boolean(imageUrl)}>
                <HeaderRow>
                    <ListName>{name}</ListName>
                    {description && <ListDescription>{description}</ListDescription>}
                    <Creator><span>A list by</span>{createdBy}</Creator>
                </HeaderRow>
            </BackdropImageOverlay>
        </StyledListHeader>
    );
}

ListHeader.propTypes = {
    name: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    description: PropTypes.string,
    backdropPath: PropTypes.string    
};

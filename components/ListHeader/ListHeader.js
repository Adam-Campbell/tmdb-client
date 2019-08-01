import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { text, getImageUrl, imageSizeConstants } from '../../utils';

const StyledListHeader = styled.div`
    position: relative;
`;

const BackdropImageHolder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ imageUrl }) => `url('${imageUrl}')`};
    background-size: cover;
    background-position: center;
    filter: grayscale(75%) contrast(110%);
`;

const BackdropImageOverlay = styled.div`
    background: ${({ hasImage }) => hasImage ? 'rgba(0,0,0,0.8)' : '#1a435d'};
    position: relative;
`;

const HeaderRow = styled(Row)`
    padding-top: 40px;
    padding-bottom: 40px;
`;

const ListName = styled.h1`
    ${text('heading', { fontSize: '2rem', color: '#fff' })}
    margin-top: 16px;
    margin-bottom: 16px;
`;

const Creator = styled.p`
    ${text('body', { color: '#43cbe8', fontWeight: 700 })}
    span {
        color: #fff;
        font-weight: 400;
        margin-right: 5px;
    }
`;

const ListDescription = styled.p`
    ${text('body', { color: '#fff' })}
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

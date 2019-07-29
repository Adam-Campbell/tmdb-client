import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import SmartImage from '../SmartImage';

const PersonHeaderContainer = styled.div`
    background: #ddd;
`;

const PersonHeaderRow = styled(Row)`
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    padding-bottom: 40px;
    @media(min-width: 600px) {
        flex-direction: row;
        align-items: center;
    }
`;

const ProfileImage = styled(SmartImage)`
    width: 120px;
    height: 180px;
    align-self: center;
    flex-shrink: 0;
    @media(min-width: 600px) {
        margin-right: 40px;
        width: 200px;
        height: 300px;
    }
    @media(min-width: 768px) {
        width: 300px;
        height: 450px;
    }
`;

const TextContainer = styled.div`

`;

const Title = styled.h1`
    ${text('heading')}
    text-align: center;
    margin-bottom: 30px;
    @media(min-width: 600px) {
        margin-bottom: 16px;
        text-align: left;
        font-size: 2rem;
    }
`;

const Subheading = styled.p`
    ${text('heading', { fontSize: '1rem' })}
`;

const Biography = styled.p`
    ${text('body')}
`;

export function PersonHeader({ name, imagePath, biography }) {
    const imageUrl = getImageUrl(imagePath, imageSizeConstants.w342);
    return (
        <PersonHeaderContainer>
            <PersonHeaderRow>
                <ProfileImage 
                    imagePath={imagePath}
                    imageSize={imageSizeConstants.w342}
                    alt={name} 
                    isPersonImage={true}
                />
                
                <TextContainer>
                    <Title>{name}</Title>
                    <Subheading>Biography</Subheading>
                    <Biography>{biography}</Biography>
                </TextContainer>
            </PersonHeaderRow>
        </PersonHeaderContainer>
    );
}

PersonHeader.propTypes = {
    name: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    biography: PropTypes.string.isRequired
};
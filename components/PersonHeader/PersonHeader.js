import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import SmartImage from '../SmartImage';
import Biography from './Biography';

const PersonHeaderContainer = styled.div`
    background: ${({ theme }) => theme.colors.uiSecondary};
`;

const PersonHeaderRow = styled(Row)`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.getSpacing(4, 0)};
    @media(min-width: 600px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

const ProfileImage = styled(SmartImage)`
    width: 120px;
    height: 180px;
    align-self: center;
    flex-shrink: 0;
    @media(min-width: 600px) {
        margin-right: ${({ theme }) => theme.getSpacing(4)};
        width: 200px;
        height: 300px;
        align-self: flex-start;
    }
    @media(min-width: 768px) {
        width: 300px;
        height: 450px;
    }
`;

const TextContainer = styled.div`
    @media (min-width: 600px) {
        align-self: center;
    }
`;

const Title = styled.h1`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.lg};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.getSpacing(3)};
    @media(min-width: 600px) {
        margin-bottom: ${({ theme }) => theme.getSpacing(2)};
        text-align: left;
    }
`;

const Subheading = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

export function PersonHeader({ name, imagePath, biography }) {
    
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
                    <Biography biography={biography} />
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
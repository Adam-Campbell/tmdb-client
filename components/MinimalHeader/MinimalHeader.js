import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import { LongArrowAltLeft } from 'styled-icons/fa-solid';

const StyledMinimalHeader = styled.div`
    background: #dc1f3b;
`;

const MinimalHeaderRow = styled(Row)`
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const Image = styled.img`
    width: 85px;
    margin-right: 20px;
`;

const TextContainer = styled.div`

`;

const Title = styled.h1`
    ${text('heading', { color: '#fff', fontSize: '2rem' })}
    margin-top: 0;
    margin-bottom: 15px;
`;

const BackLink = styled.a`
    ${text('body', { color: '#fff' })}
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    &:hover {
        text-decoration: underline;
        color: #ddd;
    }
`;

const BackIcon = styled(LongArrowAltLeft)`
    width: 25px;
    margin-right: 10px;
`;

export function MinimalHeader({ imagePath, name, backHref, backAs }) {
    const imageUrl = getImageUrl(imagePath, imageSizeConstants.w185);
    return (
        <StyledMinimalHeader>
            <MinimalHeaderRow>
                <Image 
                    src={imageUrl}
                />
                <TextContainer>
                    <Title>{name}</Title>
                    <Link href={backHref} as={backAs} passHref>
                        <BackLink>
                            <BackIcon />
                            Back to main
                        </BackLink>
                    </Link>
                </TextContainer>
            </MinimalHeaderRow>
        </StyledMinimalHeader>
    );
}

MinimalHeader.propTypes = {
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    backHref: PropTypes.string.isRequired,
    backAs: PropTypes.string.isRequired
};
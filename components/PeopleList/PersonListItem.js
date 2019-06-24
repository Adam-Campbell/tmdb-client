import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { text, getImageUrl, imageSizeConstants } from '../../utils';

const StyledPersonListItem = styled.li`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ImageLink = styled.a`
    margin-right: 20px;
    min-height: 150px;
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    width: 100px;
`;

const TextContainer = styled.div`

`;

const NameLink = styled.a`
    ${text('body', { fontWeight: 700 })}
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Description = styled.p`
    ${text('body', { fontWeight: 300, fontSize: '0.85rem' })}
    margin-top: 5px;
`;

export default function PersonListItem({ id, name, description, imagePath }) {
    const imageUrl = getImageUrl(imagePath, imageSizeConstants.w154);
    return (
        <StyledPersonListItem>
            <Link href={`/person?id=${id}`} as={`/person/${id}`} passHref>
                <ImageLink>
                    <Image src={imageUrl} />
                </ImageLink>
            </Link>
            <TextContainer>
                <Link href={`/person?id=${id}`} as={`/person/${id}`} passHref>
                    <NameLink>{name}</NameLink>
                </Link>
                <Description>{description}</Description>
            </TextContainer>
        </StyledPersonListItem>
    );
}

PersonListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string
};

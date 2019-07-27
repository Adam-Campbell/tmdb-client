import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { text, getImageUrl, imageSizeConstants } from '../../utils';
import useHover from '../useHover';

const StyledPersonListItem = styled.li`
    width: 100%;
    display: ${({ isHidden }) => isHidden ? 'none' : 'flex'};
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    @media (min-width: 550px) {
        width: 50%;
    }
`;

const ImageLink = styled.a`
    margin-right: 20px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    position: relative;
`;

const Image = styled.img`
    border-radius: 3px;
    width: 100px;
    height: 100px;
    transition: filter ease-out 0.2s;
    ${({ isHovered }) => isHovered && `
        filter: grayscale(75%) contrast(110%);
    `}
    @media (min-width: 550px) {
        width: 66px;
        height: 66px;
    }
    @media (min-width: 900px) {
        width: 100px;
        height: 100px;
    }
`;

const ImageOverlay = styled.div`
    border-radius: 3px;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition: background ease-out 0.2s;
    cursor: pointer;
    background: ${({ isHovered }) => isHovered ? 'rgba(17,17,17,0.4)' : 'none'};
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
    margin-bottom: 0;
`;

export default function PersonListItem({ id, name, description, imagePath, isHidden }) {

    const { isHovered, containerProps } = useHover();

    const imageUrl = useMemo(() => {
        return getImageUrl(imagePath, imageSizeConstants.faceMedium);
    }, [ imagePath ]);

    return (
        <StyledPersonListItem isHidden={isHidden}>
            <Link href={`/person?id=${id}`} as={`/person/${id}`} passHref>
                <ImageLink {...containerProps}>
                    <Image src={imageUrl} isHovered={isHovered} />
                    <ImageOverlay isHovered={isHovered} />
                </ImageLink>
            </Link>
            <div>
                <Link href={`/person?id=${id}`} as={`/person/${id}`} passHref>
                    <NameLink>{name}</NameLink>
                </Link>
                <Description>{description}</Description>
            </div>
        </StyledPersonListItem>
    );
}

PersonListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    isHidden: PropTypes.bool
};

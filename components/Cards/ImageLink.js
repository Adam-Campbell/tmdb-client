import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import useHover from '../useHover';
import { getImageUrl, imageSizeConstants } from '../../utils';

const StyledImageLink = styled.a`
    position: relative;
    display: flex;
    padding-bottom: 150%;
`;

const PlaceholderContainer = styled.div`
    background: #222;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: filter ease-out 0.2s;
    ${({ isHovered }) => isHovered && `
        filter: grayscale(75%) contrast(110%);
    `} 
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background ease-out 0.2s;
    cursor: pointer;
    background: ${({ isHovered }) => isHovered ? 'rgba(17,17,17,0.4)' : 'none'};
`;

export default function ImageLink({ urlSubpath, id, imagePath, imageSize }) {

    const { isHovered, containerProps } = useHover();

    const [ isLoaded, setLoaded ] = useState(false);

    const imageEl = useRef(null);

    const imageSrc = useMemo(() => {
        return getImageUrl(imagePath, imageSize);
    }, [ imagePath, imageSize ]);

    useEffect(() => {
        console.log(imageEl.current.complete);
    }, []);

    useEffect(() => {
        console.log('imagePath or imageSize updated');
    }, [ imagePath, imageSize ])

    return (
        <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
            <StyledImageLink  {...containerProps}>
                <PlaceholderContainer />
                <Image 
                    isHovered={isHovered}
                    ref={imageEl} 
                    src={imageSrc} 
                    alt="" 
                />
                <ImageOverlay isHovered={isHovered} />
            </StyledImageLink>
        </Link>
    );
}

ImageLink.propTypes = {
    imagePath: PropTypes.string.isRequired,
    imageSize: PropTypes.string.isRequired,
    urlSubpath: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
};


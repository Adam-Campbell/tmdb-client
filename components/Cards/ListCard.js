import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useLazyImage from '../useLazyImage';
import { text, imageSizeConstants } from '../../utils';
import Link from 'next/link';

const StyledListCard = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    @media (min-width: 600px) {
        width: calc(50% - 10px);
    }
`;

const ListCardInnerContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
`;

const ListImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    transition: opacity ease-out 0.2s;
`;

const ListLink = styled.a`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-decoration: none;
`;

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ hasImage }) => hasImage ? 'rgba(26, 67, 93, 0.4)' : 'rgba(26, 67, 93, 1)'};
    padding: 10px;
`;



const ListTitle = styled.h2`
    ${text('heading', { color: '#fff', fontSize: '2.25rem' })}
    font-style: italic;
    margin-top: 0;
    margin-bottom: 10px;
    text-align: center;
`;

const ItemCount = styled.p`
    ${text('body', { color: '#fff' })}
    margin-top: 10px;
    margin-bottom: 0;
`;


export function ListCard({ imagePath, name, itemCount, listId }) {

    const {
        hasImage,
        imageSrc,
        isLoaded,
        containerRef
    } = useLazyImage({ imagePath, imageSize: imageSizeConstants.w500 });

    return (
        <StyledListCard ref={containerRef}>
            <ListCardInnerContainer>
                {hasImage && <Image 
                    src={isLoaded ? imageSrc : null}
                    alt={name}
                    isLoaded={isLoaded}
                />}
                <Link href={`/list?id=${listId}`} as={`/list/${listId}`} passHref>
                    <ListLink>
                        <ContentContainer hasImage={hasImage}>
                            <ListTitle>{name}</ListTitle>
                            <ItemCount>{itemCount} {itemCount === 1 ? 'item' : 'items'}</ItemCount>
                        </ContentContainer>
                    </ListLink>
                </Link>
            </ListCardInnerContainer>
        </StyledListCard>
    );
}

ListCard.propTypes = {
    imagePath: PropTypes.string,
    name: PropTypes.string.isRequired,
    itemCount: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired
};
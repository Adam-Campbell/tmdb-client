import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useLazyImage from '../useLazyImage';
import { text, imageSizeConstants } from '../../utils';
import Link from 'next/link';
import { cover } from 'polished';

const StyledListCard = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    margin-bottom: ${({ theme }) => theme.getSpacing(3)};
    box-shadow: ${({ theme }) => theme.boxShadow};
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
    ${cover()}
    object-fit: cover;
    object-position: center;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    transition: opacity ease-out 0.2s;
`;

const ListLink = styled.a`
    display: flex;
    ${cover()}
    text-decoration: none;
`;

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ hasImage }) => hasImage ? 'rgba(26, 67, 93, 0.4)' : 'rgba(26, 67, 93, 1)'};
    padding: ${({ theme }) => theme.getSpacing(2)};
`;



const ListTitle = styled.h2`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: 2.25rem;
    font-style: italic;
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.getSpacing(2)};
    text-align: center;
`;

const ItemCount = styled.p`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    margin-top: ${({ theme }) => theme.getSpacing(2)};
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
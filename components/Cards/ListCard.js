import React from 'react';
import PropTypes from 'prop-types';
import useLazyImage from '../useLazyImage';
import { imageSizeConstants } from '../../utils';
import Link from 'next/link';
import {
    StyledListCard,
    ListCardInnerContainer, 
    ListImage,
    ListLink,
    ContentContainer,
    ListTitle,
    ItemCount
} from './listCardElements';

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
                <Link href="/list/[id]" as={`/list/${listId}`} passHref>
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

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { imageSizeConstants } from '../../utils';
import useHover from '../useHover';
import ImageLink from '../ImageLink';

const StyledPersonListItem = styled.li`
    width: 100%;
    display: ${({ isHidden }) => isHidden ? 'none' : 'flex'};
    align-items: center;
    margin: ${({ theme }) => theme.getSpacing(2, 0)};
    @media (min-width: 550px) {
        width: 50%;
    }
`;

const PersonImageLink = styled(ImageLink)`
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    align-items: center;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
    width: 100px;
    height: 100px;
    @media (min-width: 550px) {
        width: 66px;
        height: 66px;
    }
    @media (min-width: 900px) {
        width: 100px;
        height: 100px;
    }
`;

const NameLink = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Description = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    margin: ${({ theme }) => theme.getSpacing(1, 0, 0, 0)};
`;

export default function PersonListItem({ id, name, description, imagePath, isHidden }) {
    
    return (
        <StyledPersonListItem isHidden={isHidden}>
            <PersonImageLink 
                imagePath={imagePath}
                imageSize={imageSizeConstants.faceMedium}
                alt={name}
                linkHref="/person/[id]"
                linkAs={`/person/${id}`}
                isPersonImage={true}
            />
            <div>
                <Link href="/person/[id]" as={`/person/${id}`} passHref>
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

import styled from 'styled-components';
import { Star } from 'styled-icons/fa-solid';
import { NoEntry } from 'styled-icons/boxicons-solid';
import { hideVisually } from 'polished';

export const Radio = styled.input`
    ${hideVisually()}
`;

export const HiddenDescription = styled.span`
    ${hideVisually()}
`;

export const Label = styled.label`
    cursor: pointer;
`;

export const StarIcon = styled(Star)`
    color: ${({ theme, isSelected }) => isSelected ? theme.colors.info : theme.colors.uiSecondary};
    width: 30px;
    max-height: 30px;
    margin: ${({ theme }) => theme.getSpacing(0, 1)};
`;

export const ContentContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const ClearRatingIcon = styled(NoEntry)`
    width: 20px;
    max-height: 30px;
    color: ${({ theme }) => theme.colors.warning};
    margin-right: auto;
`;

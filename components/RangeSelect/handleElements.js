import styled from 'styled-components';

export const StyledHandle = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 10;
    &:focus {
        z-index: 20;
        outline: 0;
    }
`;

export const HandleInner = styled.span`
    background: ${({ theme }) => theme.colors.primary};
    width: 16px;
    height: 16px;
    border-radius: 10px;
`;

export const Marker = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
    padding-left: 5px;
    padding-right: 5px;
    height: 38px;
    width: 38px;
    border-radius: 50% 50% 50% 0;
    background: ${({ theme }) => theme.colors.complimentary};
    position: absolute;
    transform: translateX(-50%) rotate(-45deg);
`;

export const MarkerText = styled.span`
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    transform: rotate(45deg);
`;

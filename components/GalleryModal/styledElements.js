import styled from 'styled-components';
import { ArrowAltCircleLeft, ArrowAltCircleRight } from 'styled-icons/fa-solid';

export const ModalInner = styled.div`
    min-height: 300px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
`;

export const GalleryImage = styled.img`
    max-height: calc(100vh - 100px);
    max-width: calc(100vw - 60px);
`;

export const ControlsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    padding-top: ${({ theme }) => theme.getSpacing(2)};
`;

export const ArrowButton = styled.button`
    color: ${({ theme }) => theme.colors.black};
    margin: ${({ theme }) => theme.getSpacing(0, 3)};
    border: solid 2px transparent;
    background: none;
    padding: 3px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
        outline: 0;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

export const BackArrow = styled(ArrowAltCircleLeft)`
    width: 25px;
    max-height: 25px;
`;

export const ForwardArrow = styled(ArrowAltCircleRight)`
    width: 25px;
    max-height: 25px;
`;

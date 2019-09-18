import styled from 'styled-components';
import SmartImage from '../SmartImage';

export const DropdownContainer = styled.div`
    width: 220px;
    margin-left: auto;
`;

export const ThumbsContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
`;

export const PosterThumbContainer = styled.div`
    margin: 5px;
    width: calc(50% - 10px);
    @media(min-width: 550px) {
        width: calc(33.33333% - 10px);
    }
    @media(min-width: 768px) {
        width: calc(25% - 10px);
    }
    @media(min-width: 960px) {
        width: calc(20% - 10px);
    }
`;

export const PosterThumb = styled(SmartImage)`
    width: 100%;
    padding-bottom: 150%;
`;

export const BackdropThumbContainer = styled.div`
    margin: 5px;
    width: calc(100% - 10px);
    @media(min-width: 600px) {
        width: calc(50% - 10px);
    }
    @media(min-width: 768px) {
        width: calc(33.33333% - 10px);
    }
`;

export const BackdropThumb = styled(SmartImage)`
    width: 100%;
    padding-bottom: 56.25%;
`;

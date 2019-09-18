import styled from 'styled-components';
import { Row } from '../Layout';
import { SlidersH, Times } from 'styled-icons/fa-solid';
import { Button } from '../Buttons';

export const PageWrapper = styled.section`
    overflow-x: hidden;
`;

export const ContentWrapper = styled(Row)`
    display: flex;
    position: relative;
`;

export const ControlsCol = styled.div`
    position: absolute;
    left: 0;
    opacity: ${({ isShowingFilters }) => isShowingFilters ? 1 : 0};
    width: 280px;
    flex-shrink: 0;
    padding-top: ${({ theme }) => theme.getSpacing(3)};
    transition: ${({ isShowingFilters }) => {
        return isShowingFilters ? 
            'opacity 0.3s ease-out 0.3s' :
            'opacity 0.3s ease-out';
    }};
    @media (min-width: 340px) {
        width: 300px;
    }
`;

export const ResultsCol = styled.div`
    width: 100%;
    flex-shrink: 0;
    transform: ${({ isShowingFilters }) => isShowingFilters ? 'translateX(320px)' : 'translateX(0)'};
    transition: ${({ isShowingFilters }) => {
        return isShowingFilters ?
            'transform 0.3s ease-out' :
            'transform 0.3s ease-out 0.3s';
    }};
    @media (min-width: 768px) {
        transform: ${({ isShowingFilters }) => isShowingFilters ? 'translateX(340px)' : 'translateX(0)'}; 
    }
`;

export const SliderContainer = styled.div`
    width: 100%;
    padding: ${({ theme }) => theme.getSpacing(2)};
`;

export const InputContainer = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
`;

export const ComboBoxContainer = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
`;

export const FiltersIcon = styled(SlidersH)`
    width: 16px;
    max-height: 18px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

export const CloseIcon = styled(Times)`
    width: 11px;
    max-height: 18px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

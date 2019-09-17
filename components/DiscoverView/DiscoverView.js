import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
    sortByOptions, 
    mediaTypes,
    movieGenres,
    TVGenres 
} from '../../utils';
import { SlidersH, Times } from 'styled-icons/fa-solid';
import { Row } from '../Layout';
import { Button } from '../Buttons';
import { MediaCard } from '../Cards';
import RangeSelect from '../RangeSelect';
import ListBox from '../ListBox';
import ComboBox from '../ComboBox';
import TitleBlock from '../TitleBlock';

const PageWrapper = styled.section`
    overflow-x: hidden;
`;

const ContentWrapper = styled(Row)`
    display: flex;
    position: relative;
`;

const ControlsCol = styled.div`
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

const ResultsCol = styled.div`
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

const SliderContainer = styled.div`
    width: 100%;
    padding: ${({ theme }) => theme.getSpacing(2)};
`;

const InputContainer = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
`;

const ComboBoxContainer = styled.div`
    width: 100%;
    margin-bottom: ${({ theme }) => theme.getSpacing(3, 0)};
`;

const FiltersIcon = styled(SlidersH)`
    width: 16px;
    max-height: 18px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

const CloseIcon = styled(Times)`
    width: 11px;
    max-height: 18px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

export function DiscoverView({
    updateValue,
    scoreValues,
    releaseValues,
    sortBy,
    mediaType,
    withGenres,
    results
}) {
    const [ isShowingFilters, setShowingFilters ] = useState(false);
    
    return (
        <PageWrapper>
            <TitleBlock title="Discover">
                <Button onClick={() => setShowingFilters(prev => !prev)}>
                    {isShowingFilters ? 'Hide Filters' : 'Show Filters'}
                    {isShowingFilters ? <CloseIcon /> : <FiltersIcon />}
                </Button>
            </TitleBlock>
            <ContentWrapper>
                <ControlsCol isShowingFilters={isShowingFilters}>
                    <SliderContainer>
                        <RangeSelect 
                            domain={[0, 10]}
                            stepSize={0.1}
                            initialValues={[0, 10]}
                            numTicks={10}
                            contentDescription="Show me movies that scored"
                            isControlled={true}
                            externalValue={scoreValues}
                            setExternalValue={updateValue('scoreValues')}
                        />
                    </SliderContainer>
                    <SliderContainer>
                        <RangeSelect 
                            domain={[1900, 2019]}
                            stepSize={1}
                            initialValues={[1900, 2019]}
                            numTicks={5}
                            contentDescription="Show me movies made"
                            isControlled={true}
                            externalValue={releaseValues}
                            setExternalValue={updateValue('releaseValues')}
                        />
                    </SliderContainer>
                    <InputContainer>
                        <ListBox 
                            items={sortByOptions}
                            currentValue={sortBy}
                            setValue={updateValue('sortBy')}
                            shouldBuffer={true}
                            shouldInlineLabel={false}
                            labelText="Sort by:"
                        />
                    </InputContainer>
                    <InputContainer>
                        <ListBox 
                            items={mediaTypes}
                            currentValue={mediaType}
                            setValue={updateValue('mediaType')}
                            shouldBuffer={true}
                            shouldInlineLabel={false}
                            labelText="Media type:"
                        />
                    </InputContainer>
                    <ComboBoxContainer>
                        <ComboBox 
                            items={mediaType.value === 'movies' ? movieGenres : TVGenres}
                            currentSelection={withGenres}
                            setSelection={updateValue('withGenres')}
                        />
                    </ComboBoxContainer>
                </ControlsCol>
                <ResultsCol isShowingFilters={isShowingFilters}>
                    {results.map(item => (
                        <MediaCard 
                            key={item.id}
                            id={item.id}
                            title={item.title || item.name}
                            releaseDate={item.release_date || item.first_air_date}
                            averageRating={item.vote_average}
                            backdropPath={item.backdrop_path}
                            posterPath={item.poster_path}
                            overview={item.overview}
                            urlSubpath={mediaType.value === 'movies' ? '/movie' : '/show'}
                            isInline={true}
                        /> 
                    ))}
                </ResultsCol>
            </ContentWrapper>
        </PageWrapper>
    );
}

DiscoverView.propTypes = {
    updateValue: PropTypes.func.isRequired,
    scoreValues: PropTypes.arrayOf(PropTypes.number).isRequired,
    releaseValues: PropTypes.arrayOf(PropTypes.number).isRequired,
    sortBy: PropTypes.object.isRequired,
    mediaType: PropTypes.object.isRequired,
    withGenres: PropTypes.array.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired
};
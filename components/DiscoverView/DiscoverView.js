import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
    sortByOptions, 
    mediaTypes,
    movieGenres,
    TVGenres 
} from '../../utils';
import { Button } from '../Buttons';
import { MediaCard } from '../Cards';
import RangeSelect from '../RangeSelect';
import ListBox from '../ListBox';
import ComboBox from '../ComboBox';
import TitleBlock from '../TitleBlock';
import {
    PageWrapper,
    ContentWrapper, 
    ControlsCol,
    ResultsCol,
    SliderContainer,
    InputContainer,
    ComboBoxContainer,
    FiltersIcon,
    CloseIcon
} from './styledElements';

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
                    <Button onClick={() => setShowingFilters(false)}>
                        Hide Filters
                        <CloseIcon />
                    </Button>
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
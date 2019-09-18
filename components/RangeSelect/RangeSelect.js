import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import Handle from './Handle';
import Track from './Track';
import Tick from './Tick';
import { roundNum } from './utils';

const sliderStyles = {
    position: 'relative',
    width: '100%',
    height: 80
};

const StyledRail = styled.div`
    position: absolute;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.colors.uiPrimary};
`;

const DescriptionText = styled.div`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    text-align: center;
`;  

export function RangeSelect({ 
    domain, 
    stepSize, 
    initialValues, 
    numTicks, 
    contentDescription,
    isControlled,
    externalValue,
    setExternalValue
}) {

    const [ sliderVals, setSliderVals ] = useState(initialValues);

    function handleChange(vals) {
        if (isControlled) {
            setExternalValue(vals);
        } else {
            setSliderVals(vals);
        }
    }

    const valsToUse = isControlled ? externalValue : sliderVals;

    return (
        <>
            <DescriptionText>
                {contentDescription} between <strong>{valsToUse[0]}</strong> and <strong>{valsToUse[1]}</strong>
            </DescriptionText>
            <Slider
                rootStyle={sliderStyles}
                domain={domain}
                step={stepSize}
                mode={1}
                values={valsToUse}
                onChange={vals => {
                    const roundedVals = vals.map(val => roundNum(val));
                    handleChange(roundedVals);
                }}
            >
                <Rail>
                    {({ getRailProps }) => <StyledRail {...getRailProps()} />}
                </Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <>
                            {handles.map(handle => (
                                <Handle 
                                    key={handle.id}
                                    handle={handle}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </>
                    )}
                </Handles>
                <Tracks left={false} right={false}>
                    {({ tracks, getTrackProps }) => (
                        <>
                            {tracks.map(({ id, source, target }) => (
                                <Track 
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </>
                    )}
                </Tracks>
                <Ticks count={numTicks}>
                    {({ ticks }) => (
                        <>
                            {ticks.map(tick => (
                                <Tick key={tick.id} tick={tick} count={ticks.length} />
                            ))}
                        </>
                    )}
                </Ticks>
            </Slider>
        </>
    );
}

RangeSelect.propTypes = {
    // The minimum and maximum value for the slider
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    // The size of the individual steps for the slider
    stepSize: PropTypes.number.isRequired,
    // The initial values to use for the handles
    initialValues: PropTypes.arrayOf(PropTypes.number).isRequired,
    // The (rough) number of ticks to include
    numTicks: PropTypes.number.isRequired,
    // A string describing what is being shown with this slider
    contentDescription: PropTypes.string.isRequired
};

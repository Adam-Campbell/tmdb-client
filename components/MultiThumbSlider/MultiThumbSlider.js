import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import Handle from './Handle';
import Track from './Track';
import Tick from './Tick';

const sliderStyles = {
    position: 'relative',
    width: 640,
    height: 80,
    border: 'solid 1px steelblue'
};

const StyledRail = styled.div`
    position: absolute;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #8B9CB6;
`;


export function MultiThumbSlider(props) {

    return (
        <Slider
            rootStyle={sliderStyles}
            domain={[0, 100]}
            step={1}
            mode={2}
            values={[10, 20, 30]}
            onChange={(...args) => console.log(args)}
        >
            <Rail>
                {({ getRailProps }) => (
                    <StyledRail {...getRailProps()}/>
                )}
            </Rail>
            <Handles>
                {({ handles, getHandleProps }) => (
                    <>
                        {handles.map(handle => (
                            // handle is an object containing id, value and percent props, and
                            // getHandleProps is a function that when called with a handle id will
                            // return an object of props for that handle, including event handlers.
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
                    <div className="slider-tracks">
                        {tracks.map(({ id, source, target }) => (
                            <Track 
                                key={id}
                                source={source}
                                target={target}
                                getTrackProps={getTrackProps}
                            />
                        ))}
                    </div>
                )}
            </Tracks>
            <Ticks count={10}>
                {({ ticks }) => (
                    <div className="slider-ticks">
                        {ticks.map(tick => (
                            <Tick key={tick.id} tick={tick} count={ticks.length} />
                        ))}
                    </div>
                )}
            </Ticks>
        </Slider>
    );
}

MultiThumbSlider.propTypes = {
    
};

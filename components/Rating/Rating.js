import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
    VictoryPie, 
    VictoryLabel, 
    VictoryContainer, 
    Circle, 
} from 'victory';

export function Rating({ rating }) {

    // Rating can be null in certain circumstances, so coercing explicitly here to avoid
    // relying on implicit coercion when calculating. In future this component will probably
    // be developed to treat null separately to 0 however. 
    const _rating = Number(rating);

    const [ chartData, setChartData ] = useState([
        { x: 1, y: 0 },
        { x: 2, y: 10 }
    ]);

    useEffect(() => {
        setChartData([
            { x: 1, y: _rating },
            { x: 2, y: 10 - _rating }
        ]);
    }, [ rating ]);

    let chartColor;
    if (_rating >= 7) {
        chartColor = '#6ee843';
    } else if (_rating >= 4) {
        chartColor = '#f58a0b';
    } else {
        chartColor = '#dc1f3b';
    }

    // animate={{ duration: 1000 }}
    return (
        <svg viewBox="0 0 400 400" width="100%" height="100%">
            <Circle 
                cx={200}
                cy={200}
                r={200}
                style={{ fill: '#1a435d' }}
            />
            <VictoryPie
                animate={{ duration: 1000 }}
                padding={25}
                standalone={false}
                width={400} 
                height={400}
                data={chartData}
                innerRadius={145}
                cornerRadius={25}
                labels={() => null}
                style={{
                    data: { fill: (d) => {
                            return d.x === 1 ? chartColor : "transparent";
                        }
                    }
                }}
            />
            <VictoryLabel
                textAnchor="middle" 
                verticalAnchor="middle"
                x={200} 
                y={200}
                text={`${Math.round(_rating * 10)}%`}
                style={{ fontSize: 108, fill: '#fff', fontWeight: 700 }}
            />
        </svg>
    );
}
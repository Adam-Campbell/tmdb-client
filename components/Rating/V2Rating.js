import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
    VictoryPie, 
    VictoryLabel, 
    VictoryContainer, 
    Circle, 
} from 'victory';

export function V2Rating({ rating }) {

    const [ chartData, setChartData ] = useState([
        { x: 1, y: 0 },
        { x: 2, y: 10 }
    ]);

    useEffect(() => {
        setChartData([
            { x: 1, y: rating },
            { x: 2, y: 10 - rating }
        ]);
    }, [ rating ]);

    let chartColor;
    if (rating >= 7) {
        chartColor = '#6ee843';
    } else if (rating >= 4) {
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
                text={`${Math.round(rating * 10)}%`}
                style={{ fontSize: 108, fill: '#fff', fontWeight: 700 }}
            />
        </svg>
    );
}
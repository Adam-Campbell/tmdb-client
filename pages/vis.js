import React from 'react';
import styled from 'styled-components';
import 'react-vis/dist/style.css';
import { 
    XYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    LineSeries,
    VerticalBarSeries,
    MarkSeries,
    ArcSeries
} from 'react-vis';


const Container = styled.div`
    width: calc(100% - 40px);
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
    border: solid pink 1px;
`;

const Title = styled.h1`
    font-family: sans-serif;
    color: #222;
    font-weight: 700;
    font-size: 2.5rem;
`;

export default function Vis(props) {
    return (
        <Container>
            <Title>Data Vis</Title>
            <XYPlot
                width={300}
                height={300}
                xPadding={50}
            >
                <HorizontalGridLines />
                <LineSeries 
                    color="crimson"
                    data={[
                        {x: 1, y: 10},
                        {x: 2, y: 5},
                        {x: 3, y: 15}
                ]}/>
                <XAxis />
                <YAxis />
            </XYPlot>
            <XYPlot
                width={300}
                height={150}
            >
                <VerticalBarSeries
                    color="rebeccapurple" 
                    data={[
                        {x: 1, y: 10},
                        {x: 2, y: 5},
                        {x: 3, y: 15}
                ]}/>
                <XAxis />
                <YAxis />
            </XYPlot>
            <XYPlot
                width={300}
                height={300}
            >
                <MarkSeries 
                    data={[
                        {x: 1, y: 10},
                        {x: 2, y: 5},
                        {x: 3, y: 15}
                ]}/>
                <XAxis />
                <YAxis />
            </XYPlot>
        </Container>
    );
}
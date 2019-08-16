import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MediaGrid from './MediaGrid';
import { Row } from '../Layout';


const MediaGridLayoutWrapper = styled(Row)`
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    margin-bottom: ${({ theme }) => theme.getSpacing(3)};
    @media(min-width: 768px) {
        flex-direction: row;
    }
`;

const MediaGridLayoutCol = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (min-width: 768px) {
        width: 50%;
    }
`;
 
export function MediaGridLayout({
    gridOneTitle,
    gridOneData,
    gridTwoTitle,
    gridTwoData
}) {
    return (
        <MediaGridLayoutWrapper>
            <MediaGridLayoutCol>
                <MediaGrid 
                    title={gridOneTitle}
                    data={gridOneData}
                    urlSubpath="/show"
                    shouldReverse={false}
                />
            </MediaGridLayoutCol>
            <MediaGridLayoutCol>
                <MediaGrid 
                    title={gridTwoTitle}
                    data={gridTwoData}
                    urlSubpath="/movie"
                    shouldReverse={true}
                />
            </MediaGridLayoutCol>
        </MediaGridLayoutWrapper>
    )
}

MediaGridLayout.propTypes = {
    gridOneTitle: PropTypes.string.isRequired,
    gridOneData: PropTypes.arrayOf(PropTypes.object).isRequired,
    gridTwoTitle: PropTypes.string.isRequired,
    gridTwoData: PropTypes.arrayOf(PropTypes.object).isRequired
};
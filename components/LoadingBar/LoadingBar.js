import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Router from 'next/router';

const slideAcross = keyframes`
    from {
        transform: translateX(0px);
    }
    to {
        transform: translateX(calc(100vw + 80px));
    }
`;

const LoadingBarOuter = styled.div`
    background: ${({ theme }) => theme.colors.complimentary};
    width: 100%;
    height: 4px;
    position: relative;
    overflow: hidden;
`;

const LoadingBarInner = styled.div`
    background: ${({ theme }) => theme.colors.primary};
    width: 80px;
    height: 4px;
    position: absolute;
    left: -80px;
    animation-name: ${slideAcross};
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
`;



export function LoadingBar(props) {

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        function enterLoadingState() {
            setIsLoading(true);
        }
        function exitLoadingState() {
            setIsLoading(false);
        }
        Router.events.on('routeChangeStart', enterLoadingState);
        Router.events.on('routeChangeComplete', exitLoadingState);
        return function cleanup() {
            Router.events.off('routeChangeStart', enterLoadingState);
            Router.events.off('routeChangeComplete', exitLoadingState);
        }
    });

    return (
        <LoadingBarOuter>
            {isLoading && <LoadingBarInner />}
        </LoadingBarOuter>
    );
}
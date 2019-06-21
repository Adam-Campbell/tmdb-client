import React from 'react';
import styled from 'styled-components';

export const Row = styled.div`
    width: calc(100% - 40px);
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
`;

export const TwoColLayoutContainer = styled.div`
    @media (min-width: 768px) {
        background: linear-gradient(to right, #fff 0%, #fff 70%, #ddd 70%, #ddd);
    }
`;

export const TwoColLayoutRow = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
        width: calc(100% - 40px);
        max-width: 1080px;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const MainCol = styled.div`
    min-height: 300px;
    background: #fff;
    padding-left: 20px;
    padding-right: 20px;
    @media (min-width: 768px) {
        width: 70%;
        padding-left: 0;
    }
`;

export const SidebarCol = styled.div`
    min-height: 300px;
    background: #ddd;
    padding-left: 20px;
    padding-right: 20px;
    @media (min-width: 768px) {
        width: 30%;
        padding-right: 0;
    }
`;

/*

Two column layout should be composed as such:

<TwoColLayoutContainer>
    <TwoColLayoutRow>
        <MainCol>
            ...main col content in here
        </MainCol>
        <SidebarCol>
            ...sidebar content in here
        </SidebarCol>
    </TwoColLayoutRow>
</TwoColLayoutContainer>

Should I just move this out into its own component outside of this folder? If I make it into a proper
component I will need to use 'slots' to add the content which isn't a particularly nice interface. It
would look like this:

<TwoColLayout 
    mainContent={ ... JSX for main content }
    sidebarContent= { ...JSX for sidebar content }
/>

This would become somewhat cumbersome considering the amount of content likely to go in each slot. 

*/
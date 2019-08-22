import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    min-height: 140px;
    background: ${({ theme }) => theme.gradients.primary};
    margin-top: auto;
`;

export function Footer(props) {
    return (
        <StyledFooter />
    );
}
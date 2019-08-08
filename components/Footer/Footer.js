import React from 'react';
import styled from 'styled-components';
import { lighten, desaturate } from 'polished';

const StyledFooter = styled.footer`
    min-height: 140px;
    ${({ theme }) => { 
        const startColor = theme.colors.complimentary;
        const endColor = lighten( 0.1, desaturate( 0.1, startColor) );
        return `background: linear-gradient(135deg, ${startColor}, ${endColor})`;
    }};
`;

export function Footer(props) {
    return (
        <StyledFooter />
    );
}
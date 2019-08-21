import React from 'react';
import styled from 'styled-components';
import { lighten, desaturate } from 'polished';

const StyledFooter = styled.footer`
    min-height: 140px;
    background: ${({ theme }) => 
        `linear-gradient(35deg, ${theme.colors.complimentary} 35%, ${lighten(0.1, desaturate(0.1, theme.colors.success))})`
    };
`;

export function Footer(props) {
    return (
        <StyledFooter />
    );
}
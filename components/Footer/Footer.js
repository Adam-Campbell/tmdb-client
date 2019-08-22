import React from 'react';
import styled from 'styled-components';
import { Github } from 'styled-icons/fa-brands';

const StyledFooter = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 140px;
    background: ${({ theme }) => theme.gradients.primary};
    margin-top: auto;
    padding: ${({ theme }) => theme.getSpacing(3)};
`;

const GithubIcon = styled(Github)`
    width: 30px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;

const GithubLink = styled.a`
    display: flex;
    align-items: center;
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.uiPrimary};
    }
`;

export function Footer(props) {
    return (
        <StyledFooter>
            <GithubLink href="https://github.com/adam-campbell/tmdb-client">
                <GithubIcon />
                View on Github
            </GithubLink>
        </StyledFooter>
    );
}
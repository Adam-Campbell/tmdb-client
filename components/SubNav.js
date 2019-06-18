import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/*
Expects a navData prop which is an array of objects shaped:
{  
    as: {string} - the `as` prop to pass to <Link>,
    href: {string} - the `href` prop to pass to <Link>,
    text: {string} - the text content for the anchor element
}
*/

const StyledSubNav = styled.nav`
    background: rgb(220,220,220);
    padding: 0 20px;
    display: flex;
    justify-content: center;
`;

const SubNavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
`;

const SubNavItem = styled.li`
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
`;

const SubNavAnchor = styled.a`
    font-family: sans-serif;
    color: #222;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 10px;
    border-radius: 3px;
    background: transparent;
    transition: background ease-out 0.2s;
    cursor: pointer;
    &:hover {
        background: rgba(100,100,100,0.2);
    }
`;

const SubNav = ({ navData }) => (
    <StyledSubNav>
        <SubNavList>
            {navData.map((data, index) => (
                <SubNavItem key={index}>
                    <Link as={data.as} href={data.href} passHref>
                        <SubNavAnchor>{data.text}</SubNavAnchor>
                    </Link>
                </SubNavItem>
            ))}
        </SubNavList>
    </StyledSubNav>
);

export default SubNav;
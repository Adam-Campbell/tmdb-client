import React from 'react'
import Link from 'next/link'

const navData = [
	{
		as: '/',
		href: '/',
		text: 'Home'
	},
	{
		as: '/discover',
		href: '/discover',
		text: 'Discover'
	},
	{
		as: '/movies',
		href: '/movies',
		text: 'Movies'
	},
	{
		as: '/tv',
		href: '/tv',
		text: 'TV'
	},
	{
		as: '/people',
		href: '/people',
		text: 'People'
	}
];

const Nav = () => (
	<nav>
		<ul>
			{navData.map((data, index) => (
				<li key={index}>
					<Link as={data.as} href={data.as}>
						<a>{data.text}</a>
					</Link>
				</li>
			))}
		</ul>
	</nav>
); 

export default Nav;

import React, { Component } from 'react';
//importing destructured NavLink from react
import { NavLink } from 'react-router-dom';

const NavHome = () => {
	return (
		//creating a NavBar which will redirect to any component user would click on
		//adding className to the div for future styling, could also ad activeClassName for each navlink separate, matter of choice

		<div className="Navbar">
			<NavLink to='/' activeClassName="NavBarLogo">HealthApp</NavLink>
			<NavLink to='/login'>Login</NavLink>
			<NavLink to='/signup'>Signup</NavLink>
		</div>
	);
};

export default NavHome;

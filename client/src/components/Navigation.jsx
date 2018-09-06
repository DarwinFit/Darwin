import React, { Component } from 'react';
//importing destructured NavLink from react
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		//creating a NavBar which will redirect to any component user would click on
		//adding className to the div for future styling, could also ad activeClassName for each navlink separate, matter of choice
		<div className="Navbar">
			<NavLink to="/">Daily</NavLink>
			<NavLink to="/food">Food</NavLink>
			<NavLink to="/exercise">Exercise</NavLink>
		</div>
	);
};

export default Navigation;

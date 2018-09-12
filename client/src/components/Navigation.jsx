import React, { Component } from 'react';
//importing destructured NavLink from react
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		//creating a NavBar which will redirect to any component user would click on
		//adding className to the div for future styling, could also ad activeClassName for each navlink separate, matter of choice
		<nav className="navbar is-transparent">
			<div className="navbar-brand">
				<NavLink to='/' className="navbar-item">
					<h1 className="title is-4">HealthApp</h1>
				</NavLink>
			</div>
			<div className="navbar-menu is-active">
				<div className="navbar-end">
					<NavLink to='/' className="navbar-item">Daily</NavLink>
					<NavLink to='/food' className="navbar-item">Food</NavLink>
					<NavLink to='/exercise' className="navbar-item">Exercise</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;

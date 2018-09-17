import React, { Component } from 'react';
//importing destructured NavLink from react
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Logout from './Logout.jsx';

const NavMain = ({ handleLogOut }) => {
	return (
		//creating a NavBar which will redirect to any component user would click on
		//adding className to the div for future styling, could also ad activeClassName for each navlink separate, matter of choice
		// <Navbar className="nav">
		// 	<Navbar.Header>
		// 		<Navbar.Brand>
		// 			<NavLink to="/">DarWin</NavLink>
		// 		</Navbar.Brand>
		// 		<Navbar.Toggle />
		// 	</Navbar.Header>

		// 	<Navbar.Collapse>
		// 		<Nav>
		// 			<NavItem>
		// 				<Logout handleLogOut={handleLogOut} to="/" />
		// 			</NavItem>
		// 		</Nav>
		// 		<Nav pullRight>
		// 			<NavItem>
		// 				<NavLink to="/">Daily</NavLink>
		// 			</NavItem>
		// 			<NavItem>
		// 				<NavLink to="/food">Food</NavLink>
		// 			</NavItem>
		// 			<NavItem>
		// 				<NavLink to="/exercise">Exercise</NavLink>
		// 			</NavItem>
		// 		</Nav>
		// 	</Navbar.Collapse>
		// </Navbar>

	<ul className="nav">
		<li className="navhome-brand">
			<NavLink to="/">DarWin</NavLink>
		</li>
		<li className="nav-options" style={"float: right"}>
			<NavLink to="/">Daily</NavLink>
		</li>
		<li className="nav-options">
			<NavLink to="/food">Food</NavLink>
		</li>
		<li className="nav-options">
			<NavLink to="/exercise">Exercise</NavLink>
		</li>
		<li className="nav-options">
			<Logout handleLogOut={handleLogOut} to="/" />
		</li>
	</ul>
	);
};

export default NavMain;

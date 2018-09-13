import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Popup from './PopUp.jsx';

const NavHome = (props) => {
	return (
		//creating a NavBar which will redirect to any component user would click on
		//adding className to the div for future styling, could also ad activeClassName for each navlink separate, matter of choice
		<Navbar>
			<Navbar.Header>
				<Navbar.Brand>
					<NavLink to='/'>HealthApp</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>

			<Popup uiConfig={props.uiConfig} page={'Login'} />
			<Popup uiConfig={props.uiConfig} page={'Sign Up'} />
		</Navbar>
	);
};

export default NavHome;

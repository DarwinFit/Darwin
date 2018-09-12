import React, { Component } from 'react';
//importing destructured NavLink from react
import { NavLink } from 'react-router-dom';
import Popup from './PopUp.jsx';

const NavHome = (props) => {
	return (
		//creating a NavBar which will redirect to any component user would click on
		//adding className to the div for future styling, could also ad activeClassName for each navlink separate, matter of choice
		//importing PopUp component, and using instead of NavLinks, since to active it we need to click on it
		<div className="Navbar">
			<NavLink to="/" activeClassName="NavBarLogo">
				HealthApp
			</NavLink>
			<Popup uiConfig={props.uiConfig} page={'Login'} />
			<Popup uiConfig={props.uiConfig} page={'Sign Up'} />
		</div>
	);
};

export default NavHome;

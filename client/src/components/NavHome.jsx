import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Popup from './PopUp.jsx';

const NavHome = (props) => {
	return (
		//creating a NavBar which will redirect to any component user would click on
		//adding className to the div for future styling, could also ad activeClassName for each navlink separate, matter of choice
		// <ul className='nav'>
		// 	<li className='nav-brand'><NavLink to='/'>HealthApp</NavLink></li>
		// 	<li>
		// 		<button className='nav-login'>
		// 			<Popup uiConfig={props.uiConfig} page={'Login'}/>
		// 		</button>
		// 	</li>
		// 	<li>
		// 		<button className='nav-signup'>
		// 			<Popup uiConfig={props.uiConfig} page={'Sign Up'}/>
		// 		</button>
		// 	</li>
		// </ul>
		<ul className='navhome'>
			<li className='navhome-brand'><NavLink to='/'>HealthApp</NavLink></li>
			<li className='navhome-button'>
				<button className='navhome-signup'>
					<Popup uiConfig={props.uiConfig} page={'SIGN UP'}/>
				</button>
			</li>
			<li className='navhome-button'>
				<button className='navhome-login'>
					<Popup uiConfig={props.uiConfig} page={'LOGIN'}/>
				</button>
			</li>
		</ul>
	);
};

export default NavHome;

import React from 'react';

const Logout = ({ handleLogOut }) => (
	<a onClick={handleLogOut}><img src="logout.png" className="logout-img"/></a>
)

export default Logout;

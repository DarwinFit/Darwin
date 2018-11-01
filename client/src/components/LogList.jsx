import React, { Component } from 'react';
import LogListItem from './LogListItem.jsx';

const LogList = ({ items }) => {
	//creating a div with className ItemList so we could add styling to it later on
	//inside of the div we are pasing the mapped items, which would be displayed each item as a separate <li> containing a delete button and item
	return (
		<div className="ItemList">
			<h2>Daily Log</h2>
			{items.map((item, i) => {
				return (
					//returning a LogListItem component with uniq key and item which we want to be in each list component
					<LogListItem key={i} item={item} />
				);
			})}
		</div>
	);
};

export default LogList;

import React, { Component } from 'react';
import LogListItem from './LogListItem.jsx';

const LogList = (props) => {
	//creating a div with className ItemList so we could add styling to it later on
	//inside of the div we are pasing the mapped items, which would be displayed each item as a separate <li> containing a delete button and item
	return (
		<div className="ItemList">
			<h2>Your Daily Log</h2>
			{this.props.items.map((item) => {
				//returning a LogListItem component with uniq key and item which we want to be in each list component
				return <LogListItem onDelete={this.props.onDelete} key={item.id} item={item} />;
			})}
		</div>
	);
};

export default LogList;

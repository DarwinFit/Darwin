import React, { Component } from 'react';
import LogListItem from './LogListItem.jsx';

class LogList extends Component {
	//assuming that we are passing to the list component the onDelete prop(which is handleDelete function in the main component);
	deleteListItem(id) {
		this.props.onDelete(id);
	}
	render() {
		//creating a variable which will map over the array of data we are receiving
		var ListItems = this.props.items.map((item) => {
			//returning a LogListItem component with uniq key and item which we want to be in each list component
			return <LogListItem key={item.id} item={item} />;
		});
		return (
			//creating a div with className ItemList so we could add styling to it later on
			//inside of the div we are pasing the mapped items, which would be displayed each item as a separate <li> containing a delete button and item
			<div className="ItemList">
				<h2>Your Daily Log</h2>
				{ListItems}
			</div>
		);
	}
}

export default LogList;

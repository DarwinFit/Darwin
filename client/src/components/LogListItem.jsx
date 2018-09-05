import React, { Component } from 'react';

class LogListItem extends Component {
	//passing the id of the item which was onClick function used on, to the LogList component so it would pass it up to the App component
	deleteListItem(id) {
		this.props.onDelete(id);
	}
	render() {
		return (
			//creating an <li> with classname ListItem so we could later use it for styling purposes
			//inside we are receiving the item from the parent component which is LogList,
			//adding to it a button with onClick function binded to the item ID and also to the delete function which is passed up to the parent.
			<li className="ListItem">
				{this.props.item}{' '}
				<button className="listButton" onClick={this.deleteListItem.bind(this, this.props.item.id)}>
					X
				</button>
			</li>
		);
	}
}

export default LogListItem;

import React, { Component } from 'react';

const LogListItem = ({ item }) => {
	//creating an <li> with classname ListItem so we could later use it for styling purposes
	//inside we are receiving the item from the parent component which is LogList,
	//adding to it a button with onClick function binded to the item ID and also to the delete function which is passed up to the parent.
	return <li className="ListItem">{item} </li>;
};

export default LogListItem;

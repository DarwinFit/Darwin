import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: ''
		};
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	//setting the searchValue to the whatever was the input, also we need this as a separate function to prevent searching without actually clicking search
	handleOnChange(event) {
		//preventing the default behavior of the component, without this the page would refresh after every change
		event.preventDefault();
		//setting the searchValue to the value of the what text we have in the input field
		this.setState({ searchValue: event.target.value });
	}
	//on click on the Search Button, we are passing the Search value of this state to the parent component Search function which would handle
	// the api request
	handleSubmit(event) {
		//preventing the refreshing of the page, just showing the results
		event.preventDefault();
		this.props.onSearch(this.state.searchValue);
	}

	render() {
		//search text means the text we want to have in our phrase before the input field, which would give a hint to user for what to search
		// depends on the either we are in the food component or exercise
		var searchText = this.props.showFood === true ? 'food' : 'exercise';
		var placeholder = `describe your ${searchText}`;
		//creating below a div element with a classname for further styling
		//inside creating a label which would describe to the user what he can search for in this component
		//creating a button which would handle the sending of the searched value to the parent component
		return (
			<div className="SearchBar">
				<label className="SearchText">Write what type of {searchText} you would like to look for: </label>
				<input
					type="text"
					value={this.state.searchValue}
					onChange={this.handleOnChange}
					placeholder={placeholder}
				/>
				<button className="" type="submit" onSubmit={this.handleSubmit}>
					Look it Up!
				</button>
			</div>
		);
	}
}

export default Search;

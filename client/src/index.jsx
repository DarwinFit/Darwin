import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Signup from './components/Signup.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			food_nutrition: {
				sugar: 0,
				calorie: 0,
				carbs: 0,
				protein: 0,
				fat: 0
			},
			daily_nutrition: {
				sugar: 0,
				calorie: 0,
				carbs: 0,
				protein: 0,
				fat: 0
			},
			foodLog: [],
			exerciseLog: [],
			value: ''
		};

		this.getValidationState = this.getValidationState.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

	render() {
		return (
			<Signup getValidationState={this.getValidationState}
							value={this.state.value}
							handleChange={this.handleChange}/>
		);
	}
}
ReactDOM.render(<App />, document.getElementById('app'));

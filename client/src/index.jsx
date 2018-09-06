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
			exerciseLog: []
		};
	}
	render() {
		return (
			<Signup/>
		);
	}
}
ReactDOM.render(<App />, document.getElementById('app'));

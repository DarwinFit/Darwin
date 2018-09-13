import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';

import Main from './components/Main.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';

firebase.initializeApp({
	apiKey: 'AIzaSyBkxu2k8Mo4K4u-WmqIhcSp0lOE5Nl7VOs',
	authDomain: 'healthapp-c1de8.firebaseapp.com'
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			foodNutrition: {
				name: '',
				serving_qty: 0,
				serving_wt_g: 0,
				sugar: 0,
				calories: 0,
				carbs: 0,
				protein: 0,
				fat: 0
			},
			dailyNutrition: {
				sugar: 0,
				calories: 0,
				carbs: 0,
				protein: 0,
				fat: 0
			},
			exerciseData: {
				name: '',
				duration_min: 30,
				nf_calories: 150
			},
			foodItems: [],
			exerciseItems: [],
			userData: {
				username: null,
				email: null,
				age: null,
				gender: null,
				height: null,
				weight: null
			},
			isSignedIn: false
		};

		this.uiConfig = {
			signInFlow: 'popup',
			signInOptions: [ firebase.auth.FacebookAuthProvider.PROVIDER_ID ],
			callbacks: {
				signInSuccess: () => false
			}
		};

		this.handleAddFood = this.handleAddFood.bind(this);
		this.handleAddExercise = this.handleAddExercise.bind(this);
		this.authListener = this.authListener.bind(this);
		this.handleAddInfo = this.handleAddInfo.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.userAuthenticatedAndExists = this.userAuthenticatedAndExists.bind(this);
	}
	componentDidMount() {
		this.authListener();
	}

	//authenticate the user and check if the user is in the DB
	authListener() {
		firebase.auth().onAuthStateChanged((user) => {
			let newUserAuth = this.state.userData;
			newUserAuth.email = user.email;
			newUserAuth.username = user.displayName;
			if (user) {
				this.setState({ userData: newUserAuth });
				this.setState({ isSignedIn: true });
			} else {
				console.log('Problems with authentication');
			}
		});
	}
	//logs out the user and sets the state of the user data to null
	handleLogOut() {
		firebase.auth().signOut();
		let userSignOut = this.state.userData;
		userSignOut.username = null;
		userSignOut.email = null;
		userSignOut.age = null;
		userSignOut.gender = null;
		userSignOut.height = null;
		userSignOut.weight = null;

		this.setState({ userData: userSignOut });
		this.setState({ isSignedIn: false });
		console.log('LogOut Data! > ', this.state.userData);
	}

	handleAddFood() {
		return;
	}

	handleAddExercise() {
		return;
	}

	//handle the new user info if the user doesn't have its data available
	handleAddInfo(age, gender, height, weight) {
		let newUserData = this.state.userData;
		newUserData.age = age;
		newUserData.gender = gender;
		newUserData.height = height;
		newUserData.weight = weight;
		this.setState({
			userData: newUserData
		});
		console.log('Adding this data to DB! ', newUserData);
		// axios.post('/users/add', { newUserData }).then(() => {}).catch((err) => console.log(err));
	}

	userAuthenticatedAndExists() {
		let user = this.state.userData.username;
		//here has to be a function which calls the server for checking if there is user or not
		// axios
		// 	.post('/users', { user })
		// 	.then(({ data }) => {
		// 		var userData = this.state.userData;
		// 		userData.age = data.age;
		// 		userData.gender = data.gender;
		// 		userData.height = data.height;
		// 		userData.weight = data.weight;
		// 		this.setState({ userData: userData });
		// 		return true;
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		return false;
		// 	});

		if (Object.values(this.state.userData).indexOf(null) === -1) {
			console.log(Object.values(this.state.userData));
			return true;
		} else {
			console.log(Object.values(this.state.userData));
			return false;
		}
	}
	render() {
		if (this.state.isSignedIn) {
			if (this.userAuthenticatedAndExists()) {
				return (
					<Main
						username={this.state.userData.username}
						dailyNutrition={this.state.dailyNutrition}
						foodNutrition={this.state.foodNutrition}
						handleAddFood={this.handleAddFood}
						showFood={this.state.showFood}
						foodItems={this.state.foodItems}
						exerciseItems={this.state.exerciseItems}
						exerciseData={this.state.exerciseData}
						handleAddExercise={this.handleAddExercise}
						onDelete={this.onDelete}
						logOut={this.handleLogOut}
					/>
				);
			} else {
				{
					/*passing the username to signup so it will have access to the username*/
				}
				return <Signup username={this.state.userData.username} handleAddInfo={this.handleAddInfo} />;
			}
		} else {
			return <Home uiConfig={this.uiConfig} handleAddInfo={this.handleAddInfo} />;
		}
	}
}

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
);

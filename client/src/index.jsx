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
				//burnt = 0;
				name: '',
				serving_qty: 0,
				serving_wt_g: 0,
				fat: 0,
				calories: 0,
				carbs: 0,
				sugars: 0,
				protein: 0
			},
			dailyNutrition: {
				calories: 0,
				fat: 0,
				carbs: 0,
				sugar: 0,
				protein: 0
			},
			exerciseData: {
				name: '',
				duration_min: 0,
				nf_calories: 0
			},
			foodItems: [],
			exerciseItems: [],
			userData: {
				id: '',
				username: null,
				age: null,
				gender: null,
				height: null,
				weight: null,
				avg_calories: 0
			},
			searchedExercise: '',
			date: '',
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
		this.getDate = this.getDate.bind(this);
		this.searchFood = this.searchFood.bind(this);
		this.searchExercise = this.searchExercise.bind(this);
		this.getDailyTotalFood = this.getDailyTotalFood.bind(this);
	}
	componentDidMount() {
		this.authListener();
		this.getDate();
	}

	//gets the today mm/dd/yyyy and sets it into the state
	getDate() {
		let time = new Date();
		let date = time.getMonth() + '/' + time.getDay() + '/' + time.getFullYear();
		this.setState({ date: date });
	}

	//authenticate the user and check if the user is in the DB
	authListener() {
		firebase.auth().onAuthStateChanged((user) => {
			let newUserAuth = this.state.userData;
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
		userSignOut.age = null;
		userSignOut.gender = null;
		userSignOut.height = null;
		userSignOut.weight = null;
		userSignOut.avg_calories = null;

		this.setState({ userData: userSignOut });
		this.setState({ isSignedIn: false });
		console.log('LogOut Data! > ', this.state.userData);
	}

	//search = post to food_history/search - foodname or string which contains foodname
	searchFood(food) {
		console.log('Searching for this food: ', food);
		let updatedFood = this.state.foodNutrition;

		axios
			.post('food_history/search', { food })
			// getting back the food object with nutrients
			.then((foodData) => {
				console.log('THIS IS THE DATA WE GETTING BACK FROM searchingFood:', foodData);
				updatedFood.name = foodData.food_name;
				updatedFood.serving_qty = foodData.serving_qty;
				updatedFood.serving_wt_g = foodData.serving_wt_g;
				updatedFood.calories = foodData.nf_calories;
				updatedFood.fat = foodData.nf_total_fat;
				updatedFood.carbs = foodData.nf_total_carbohydrate;
				updatedFood.sugars = foodData.nf_sugars;
				updatedFood.protein = foodData.nf_protein;

				//set the state of the foodnutrient
				this.setState({ foodNutrition: updatedFood });
			})
			.catch((err) => console.error(err));
	}

	//search = post to exercise_history/search - exercise string + username
	searchExercise(exercise) {
		console.log('Searching for this exercise: ', exercise);
		let updatedExercise = this.state.exerciseData;

		axios
			.post('exercise_history/search', { exercise })
			// getting back the updatedExercise obj;
			.then((exrsData) => {
				console.log('THIS IS DATA WE GETTING BACK FROM searchExercise: ', exrsData);
				updatedExercise.name = exrsData.name;
				updatedExercise.duration_min = exrsData.duration_min;
				updatedExercise.nf_calories = exrsData.nf_calories;
				//set the state of exercisedata
				this.setState({ exerciseData: updatedExercise });
				this.setState({ searchedExercise: exercise });
			})
			.catch((err) => console.error(err));
	}

	//fooddaily-- whenever daily component is mounting we making db call  --returnning all nutrients for today
	getDailyTotalFood() {
		let dailyFoodNutrients = this.state.dailyNutrition;
		let options = [ this.state.userData.username, this.state.date ];
		axios
			.get('fooddaily', { options })
			//GetDaily  data for username date
			.then((data) => {
				console.log('Getting back data for total daily: ', data);
				dailyFoodNutrients.calories = data.calories;
				dailyFoodNutrients.fat = data.totalfat;
				dailyFoodNutrients.carbs = data.carbs;
				dailyFoodNutrients.sugars = data.sugar;
				dailyFoodNutrients.protein = data.protein;
				this.setState({ dailyNutrition: dailyFoodNutrients });
			})
			.catch((err) => console.error(err));
	}

	//exerciseDaily - get post to exercise history -- list of exercises

	handleAddFood() {
		let options = this.state.foodNutrition;
		//SHOULD WE ADD BURNT?
		axios
			.post('food_history', options)
			.then((data) => {
				console.log('THIS IS THE DATA FROM HANDLING ADDFOOD', data);
				let updatedFood = this.state.foodItems;
				updatedFood = data;
				this.setState({ foodItems: updatedFood });
			})
			.catch((err) => console.error(err));
	}

	handleAddExercise() {
		//axios.post('/exercise_history', userid date string username
		// WE NEED TO TALK ABOUT ADDING TIME TO THE EXERCISE IN DB

		let options = [ this.state.userData.username, this.state.date, this.state.searchedExercise ];
		//do we want to add Burnt here ?
		axios.post('/exercise_history', options).then((data) => {
			console.log('THIS IS DATA WE GETTING BACK FROM ADDEXERCISE: ', data);
			let updatedData = this.state.exerciseItems;
			updatedData = data;
			this.setState({ exerciseItems: updatedData });
		});
	}

	//handle the new user info if the user doesn't have its data available
	handleAddInfo(age, gender, height, weight) {
		//Mifflin-St. Jeor  equation for needed calorie intake
		//at the end we choose as a base 1.3 multiplier since its for moderately active people, for sedentary choose 1.2 for active 1.4
		let calorieCalc = function(years, gndr, cm, kg) {
			if (gndr === 'male') {
				return (10 * kg + 6.25 * cm - 5 * years + 5) * 1.3;
			}
			if (gndr === 'female') {
				return (10 * kg + 6.25 * cm - 5 * years - 161) * 1.3;
			}
		};

		let newUserData = this.state.userData;

		newUserData.age = age;
		newUserData.gender = gender;
		newUserData.height = height;
		newUserData.weight = weight;
		newUserData.avg_calories = calorieCalc(age, gender, height, weight);
		this.setState({
			userData: newUserData
		});
		console.log('Adding this data to DB! ', newUserData);
		axios
			.post('/users', { newUserData })
			.then(() => {
				console.log('Data add success!');
			})
			.catch((err) => console.log(err));
	}

	userAuthenticatedAndExists() {
		let user = this.state.userData.username;
		//here has to be a function which calls the server for checking if there is user or not
		axios
			.get('/users', { user })
			.then(({ data }) => {
				console.log('THIS IS THE DATA IN AUTH: ', data);
				var userData = this.state.userData;
				userData.id = data.user_id;
				userData.age = data.age;
				userData.gender = data.gender;
				userData.height = data.height;
				userData.weight = data.weight;
				userData.avg_calories = calorieCalc(data.age, data.gender, data.height, data.weight);
				this.setState({ userData: userData });
				return true;
			})
			.catch((err) => {
				console.log(err);
				return false;
			});

		// if (Object.values(this.state.userData).indexOf(null) === -1) {
		// 	console.log(Object.values(this.state.userData));
		// 	return true;
		// } else {
		// 	console.log(Object.values(this.state.userData));
		// 	return false;
		// }
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
						foodItems={this.state.foodItems}
						exerciseItems={this.state.exerciseItems}
						exerciseData={this.state.exerciseData}
						handleAddExercise={this.handleAddExercise}
						logOut={this.handleLogOut}
						searchFood={this.searchFood}
						searchExercise={this.searchExercise}
						getDailyTotalFood={this.getDailyTotalFood}
						handleAddFood={this.handleAddFood}
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

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
        fat: 0,
        calories: 0,
        carbs: 0,
        sugars: 0,
        protein: 0
      },
      dailyNutrition: {
        burnt: 0,
        calories: 0,
        fat: 0,
        carbs: 0,
        sugars: 0,
        protein: 0
      },
      exerciseData: {
        name: '',
        duration_min: 0,
        nf_calories: 0
      },
      foodItems: [],
      exerciseItems: [],
      intakeData: [],
      burntData: [],
      userData: {
        id: null,
        username: null,
        age: null,
        gender: null,
        height: null,
        weight: null,
        avg_calories: 0
      },
      searchedExercise: '',
      date: '',
      isSignedIn: false,
      userExists: false
    };

    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccess: () => false
      }
    };

    this.getFoodLog = this.getFoodLog.bind(this);
    this.getExerciseLog = this.getExerciseLog.bind(this);
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
    this.getHistoryOfBurntAndEat = this.getHistoryOfBurntAndEat.bind(this);
  }
  componentDidMount() {
    this.authListener();
    this.getDate();
  }

  //gets the today mm/dd/yyyy and sets it into the state
  getDate() {
    let date = new Date();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let fullDate = [year, month, day].join('');
    this.setState({ date: fullDate });
  }

  //authenticate the user and check if the user is in the DB
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      let newUserAuth = this.state.userData;
      newUserAuth.username = user.displayName;
      if (user) {
        this.setState({ userData: newUserAuth, isSignedIn: true }, () => {
          this.userAuthenticatedAndExists();
        });
      } else {
        console.log('Problems with authentication');
      }
    });
  }
  userAuthenticatedAndExists() {
    let username = this.state.userData.username;
    let updatedData = this.state.userData;

    //here has to be a function which calls the server for checking if there is user or not
    axios
      .get('/health/users', { params: { username: username } })
      .then(({ data }) => {
        if (data.id > 0) {
          updatedData.id = data.id;
          updatedData.age = data.age;
          updatedData.gender = data.gender;
          updatedData.height = data.height;
          updatedData.weight = data.weight;
          updatedData.avg_calories = data.avg_calories;
          this.setState({ userData: updatedData, userExists: true }, () => {
            //calling to get the total for today, if the user logged out and then logged in
            this.getDailyTotalFood();
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
    this.setState({ userExists: false });
  }

  getFoodLog() {
    axios
      .get('/health/food_history', {
        params: { user_id: this.state.userData.id, date: this.state.date }
      })
      .then(({ data }) => {
        let fooditems = [];
        data.forEach((entry) => {
          fooditems.push(entry.food_name);
        });
        if (data.length > 0) this.setState({ foodItems: fooditems });
      })
      .catch((err) => {
        console.log('Could not retrieve food entries from database');
        console.error(err);
      });
  }

  getExerciseLog() {
    axios
      .get('/health/exercise_history', {
        params: { user_id: this.state.userData.id, date: this.state.date }
      })
      .then(({ data }) => {
        let exerciseitems = [];
        data.forEach((entry) => {
          exerciseitems.push(entry.exercise_name);
        });
        if (data.length > 0) this.setState({ exerciseItems: exerciseitems });
      })
      .catch((err) => {
        console.log('Could not retrieve food entries from database');
        console.error(err);
      });
  }

  //getting the history of burnt and eaten by user for all time

  getHistoryOfBurntAndEat() {
    axios
      .get('/health/daily/user', {
        params: { user_id: this.state.userData.id }
      })
      .then(({ data }) => {
        let intakeData = [];
        let burntData = [];
        if (data.length === 0) {
          let dateNow = new Date();
          dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
          let food = { t: dateNow, y: 0 };
          let exercise = { t: dateNow, y: this.state.userData.avg_calories };
          intakeData.push(food);
          burntData.push(exercise);
        }
        data.forEach(function(entry) {
          let date = new Date(entry.date);
          let year = date.getFullYear();
          let month = date.getMonth();
          let day = date.getDate();
          let food = {
            t: new Date(year, month, day),
            y: entry.calories
          };
          let exercise = {
            t: new Date(year, month, day),
            y: entry.burnt
          };
          intakeData.push(food);
          burntData.push(exercise);
        });
        this.setState({ intakeData: intakeData, burntData: burntData });
      })
      .catch((err) => console.error(err));
  }

  //search = post to food_history/search - foodname or string which contains foodname
  searchFood(food) {
    let updatedFood = this.state.foodNutrition;

    axios
      .post('/health/food_history/search', { food_name: food })
      // getting back the food object with nutrients
      .then(({ data }) => {
        updatedFood.name = data.food_name;
        updatedFood.serving_qty = data.serving_qty;
        updatedFood.serving_wt_g = data.serving_weight_grams;
        updatedFood.calories = data.nf_calories;
        updatedFood.fat = data.nf_total_fat;
        updatedFood.carbs = data.nf_total_carbohydrate;
        updatedFood.sugars = data.nf_sugars;
        updatedFood.protein = data.nf_protein;

        //set the state of the foodnutrient
        this.setState({ foodNutrition: updatedFood });
      })
      .catch((err) => console.error(err));
  }

  //search = post to exercise_history/search - exercise string + username
  searchExercise(exercise) {
    let updatedExercise = this.state.exerciseData;

    axios
      .post('/health/exercise_history/search', {
        exercise_name: exercise,
        username: this.state.userData.username
      })
      // getting back the updatedExercise obj;
      .then(({ data }) => {
        updatedExercise.name = data.name;
        updatedExercise.duration_min = data.duration_min;
        updatedExercise.nf_calories = data.nf_calories;
        //set the state of exercisedata
        this.setState({
          exerciseData: updatedExercise,
          searchedExercise: exercise
        });
      })
      .catch((err) => console.error(err));
  }

  //fooddaily-- whenever daily component is mounting we making db call  --returnning all nutrients for today
  getDailyTotalFood() {
    let dailyFoodNutrients = this.state.dailyNutrition;
    axios
      .get('/health/daily', {
        params: { user_id: this.state.userData.id, date: this.state.date }
      })
      //GetDaily  data for username date
      .then(({ data }) => {
        if (data.length > 0) {
          dailyFoodNutrients.burnt = data[0].burnt;
          dailyFoodNutrients.calories = data[0].calories;
          dailyFoodNutrients.fat = data[0].total_fat;
          dailyFoodNutrients.carbs = data[0].total_carbohydrate;
          dailyFoodNutrients.sugars = data[0].sugars;
          dailyFoodNutrients.protein = data[0].protein;
          this.setState({ dailyNutrition: dailyFoodNutrients }, () => {
            this.getFoodLog();
            this.getExerciseLog();
          });
        } else {
          let newDailyWithBurnt = this.state.dailyNutrition;
          newDailyWithBurnt.burnt = this.state.userData.avg_calories;
          this.setState({ dailyNutrition: newDailyWithBurnt });
        }
      })
      .then(() => {
        this.getHistoryOfBurntAndEat();
      })
      .catch((err) => console.error(err));
  }

  //exerciseDaily - get post to exercise history -- list of exercises

  handleAddFood() {
    let options = {
      avg_cal: this.state.userData.avg_calories,
      food_name: `${this.state.foodNutrition.serving_qty} ${this.state.foodNutrition.name}`,
      user_id: this.state.userData.id,
      date: this.state.date,
      total_fat: this.state.foodNutrition.fat,
      calories: this.state.foodNutrition.calories,
      total_carbohydrate: this.state.foodNutrition.carbs,
      sugars: this.state.foodNutrition.sugars,
      protein: this.state.foodNutrition.protein
    };
    axios
      .post('/health/food_history', options)
      .then(({ data }) => {
        let updatedFood = [];

        data.forEach(function(entry) {
          updatedFood.push(entry.food_name);
        });
        this.setState({ foodItems: updatedFood }, () => {
          //calling get dailytotal, so it will retrieve the updated total of what we ate today
          this.getDailyTotalFood();
          this.getFoodLog();
        });
      })
      .then(() => {
        this.getHistoryOfBurntAndEat();
      })
      .catch((err) => console.error(err));
  }

  handleAddExercise() {
    //axios.post('/exercise_history', userid date string username
    // WE NEED TO TALK ABOUT ADDING TIME TO THE EXERCISE IN DB

    let options = {
      user_id: this.state.userData.id,
      date: this.state.date,
      exercise_name: this.state.searchedExercise,
      burnt: this.state.exerciseData.nf_calories,
      avg_cal: this.state.userData.avg_calories
    };
    axios
      .post('/health/exercise_history', options)
      .then(({ data }) => {
        let updatedData = [];
        data.forEach(function(entry) {
          updatedData.push(entry.exercise_name);
        });
        this.setState({ exerciseItems: updatedData }, () => {
          this.getDailyTotalFood();
          this.getExerciseLog();
        });
      })
      .then(() => {
        this.getHistoryOfBurntAndEat();
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

    let newUserData = {};
    newUserData.username = this.state.userData.username;
    newUserData.age = age;
    newUserData.gender = gender;
    newUserData.height = height;
    newUserData.weight = weight;
    newUserData.avg_calories = calorieCalc(age, gender, height, weight);
    dailyNutrition = this.dailyNutrition;
    dailyNutrition.burnt = newUserData.avg_calories;
    this.setState(
      {
        userData: newUserData,
        dailyNutrition
      },
      this.getHistoryOfBurntAndEat
    );
    axios
      .post('/health/users', newUserData)
      .then((data) => {
        this.setState({
          isSignedIn: true,
          userExists: true
        });
        console.log('Data add success!');
      })
      .catch((err) => console.error(err));
  }

  render() {
    if (this.state.isSignedIn) {
      if (this.state.userExists) {
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
            handleAddFood={this.handleAddFood}
            userData={this.state.userData}
            burnt={this.state.burntData}
            intake={this.state.intakeData}
          />
        );
      } else {
        {
          /*passing the username to signup so it will have access to the username*/
        }
        return (
          <Signup username={this.state.userData.username} handleAddInfo={this.handleAddInfo} />
        );
      }
    } else {
      return <Home uiConfig={this.uiConfig} handleAddInfo={this.handleAddInfo} />;
    }
    // return (<Signup username={'Julie'} handleAddInfo={this.handleAddInfo}/>);
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);

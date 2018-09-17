const { getExercises, getNutrients } = require('../helpers/apihelpers.js');
const models = require('../models/models.js');
const axios = require('axios');

module.exports = {
	//saving new user in database
	createNewUser: (req, res) => {
		// console.log('request received:', req.body);
		models.saveNewUser.post(req.body, (err, results) => {
			if (err) console.log('Error caught on createNewUser in controller.js', err);
			else res.sendStatus(201);
		});
	},
	//retrieving user's information from database
	getUserInfo: (req, res) => {
		// console.log('This is request in get:', req.query.username);
		let { username } = req.query;
		models.getUserInfo.get(username, (err, results) => {
			if (err) {
				console.log('Error caught on getUserInfo in controller.js', err);
				res.sendStatus(404);
			} else {
				res.send(results[0]);
			}
		});
	},

	//API request for user's food search
	searchFoodEntry: (req, res) => {
		// console.log('req.body in search', req.body);
		let { food_name } = req.body;
		getNutrients(food_name, (err, data) => {
			if (err) console.log('Error inside searchFoodEntry in controllers.js', err);
			else {
				res.send(data.foods[0]);
			}
		});
	},
	//when 'add food' is clicked after api request for food search
	createFoodEntry: (req, res) => {
		let { food_name, user_id, date } = req.body;
		let query = [ user_id, date ];
    let body = [ food_name, user_id, date ];
		let nutrientsToBeUpdated = {};
    //check daily nutrients of user to see if it's the first entry of the day or just updating the nutrient entry
		models.getDaily.get(query, (err, result) => {
      if (err) console.log('Error inside createFoodEntry in controllers.js at 1st callback', err);
      //if it's the first entry of the day, result.length would be zero: user is putting in first food entry of the day
			else if (result.length === 0) {
        let { calories, total_fat, total_carbohydrate, protein, sugars, user_id, date } = req.body;
        //user is comsuming nutrients therefore burnt = 0
        let params = [ 0, calories, total_fat, total_carbohydrate, protein, sugars, user_id, date ];
				models.firstDailyFoodOrExerciseUpdate.post(params, (err, result) => {
					if (err) console.log('Error inside createFoodEntry in controllers.js at 2nd callback', err);
					else {
            //adding the first food entry to the database
						models.insertIntoFoodHistory.post(body, (err, entry) => {
							if (err) console.log('Error inside createFoodEntry in controllers at 3rd callback', err);
							else {
                //retrieving the food entries for the user on this specific date
								models.getFoodEntry.get(query, (err, result) => {
									if (err)
										console.log('Error inside createFoodEntry in controllers at 4th callback', err);
									else {
                    //send back results to front-end
										res.send(result.data[0]);
									}
								});
							}
						});
					}
        });
      //the user has already eaten today so just updating the food nutrients to the database: updating user's daily intake
			} else {
        //adding another food entry to the database
				models.insertIntoFoodHistory.post(body, (err, result) => {
					if (err) console.log('Error caught at insertIntoFoodHistory in controllers', err);
					else {
            //getting the user's daily nutrients until this food element has been added
						models.getDailyForFood.get(query, (err, results) => {
							if (err) console.log('Error caught at getDailyForFood in controllers', err);
							else {
                //setting nutrientToBeUpdated to the result so as to be able to manipulate and update it
								nutrientsToBeUpdated = results[0];
								let { calories, total_fat, total_carbohydrate, protein, sugars } = req.body;
								let inputtedNutrients = {
									burnt: 0,
									calories: calories,
									total_fat: total_fat,
									total_carbohydrate: total_carbohydrate,
									protein: protein,
									sugars: sugars
                };
                //iterate over nutrientToBeUpdated and add the new nutrients
								for (let key in nutrientsToBeUpdated) {
									let oldNutrient = nutrientsToBeUpdated[key];
									nutrientsToBeUpdated[key] = oldNutrient + inputtedNutrients[key];
								}
                //update the daily for the food nutrients
								models.updateDailyForFood.post(nutrientsToBeUpdated, query, (err, entry) => {
									if (err) console.log('Error caught at updateDailyForFood in controllers', err);
									else {
                    //retrieve the food entries of the day so far after updatting the database
										models.getFoodEntry.get(query, (err, result) => {
											if (err)
												console.log('Error inside createFoodEntry in controllers at 4th callback', err);
											else {
                        console.log('Database has been updated with new food entry');
                         //send back results to front-end
												res.send(result);
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	},
  //retrieve the food entries from that database
	getFoodEntry: (req, res) => {
		// console.log('req in getFoodEntry in controllers', req);
		let { user_id, date } = req.query;
		let params = [ user_id, date ];
		models.getFoodEntry.get(params, (err, result) => {
			if (err) console.log('Error caught on getFoodEntry in controller.js', err);
			else res.send(result);
		});
	},

	// API request - WORKS - FIX SO THAT USER DOESN'T NEED TO INPUT ALL
	// this controller function makes a call to the external API to access data from Nutritionix. 
	// get Exercises is a function that is being imported from the /helpers file. 
	searchExerciseEntry: (req, res) => {
		let { username, exercise_name } = req.body;
		models.getUserInfo.get(username, (err, result) => {
			if (err) console.log('Error caught at userInfo in searchExerciseEntry in controllers', err);
			else {
				let user = result[0];
				let query = {
					exercise_name: exercise_name,
					gender: user.gender,
					weight_kg: user.weight,
					height_cm: user.height,
					age: user.age
				};
				getExercises(query, (err, data) => {
					if (err) console.log('Error inside getExercises in searchExerciseEntry in controllers', err);
					else {
						res.send(data.exercises[0]);
					}
				});
			}
		});
	},
	//when 'add exercise' is clicked
	// this controller function adds the excercise done to the database
	// if this is the first exercise inserted for the day we will make that check then determine if 
	// burnt calories must be added to an already accumulating burnt amount or if this will be the 
	// first burnt entry of the day
	// we will also need to add to the exercise history table also just so we know what exercies we did
	// on this day and the days prior
	
	createExerciseEntry: (req, res) => {
		// console.log('hitting createExerciseEntry in controllers', req.body);
		let { exercise_name, user_id, date, username } = req.body;
		let query = [ user_id, date ];
		let body = [ exercise_name, user_id, date ];
		let burntToBeUpdated = {};
		//check daily burnt of user for first entry of the day or just update entry
		models.getDaily.get(query, (err, result) => {
			// console.log('result from getDaily is', result);
			if (err) console.log('Error inside createExerciseEntry in controllers.js at 1st callback', err);
			else if (result.length === 0) {
				//user is putting in first exercise entry of the day
				// console.log('result.length is zero therefore inserting first exercise of day');
				let { burnt, user_id, date } = req.body;
				let params = [ burnt, 0, 0, 0, 0, 0, user_id, date ];
				models.firstDailyFoodOrExerciseUpdate.post(params, (err, result) => {
					if (err) console.log('Error inside createExerciseEntry in controllers.js at 2nd callback', err);
					else {
						models.insertIntoExerciseHistory.post(body, (err, entry) => {
							if (err)
								console.log('Error inside createExerciseEntry in controllers.js at 3rd callback', err);
							else {
								models.getExerciseEntry.get(query, (err, result) => {
									if (err)
										console.log(
											'Error inside createExerciseEntry in controllers.js at 4th callback',
											err
										);
									else res.send(result);
								});
							}
						});
					}
				});
			} else {
				//updating user's burnt intake
				models.insertIntoExerciseHistory.post(body, (err, result) => {
					if (err) console.log('Error caught at insertIntoExerciseHistory in controllers', err);
					else {
						models.getDailyForExercise.get(query, (err, results) => {
							if (err) console.log('Error caught at getDailyForExercise in controllers', err);
							else {
								burntToBeUpdated = results[0];
								let { burnt } = req.body;
								let inputtedBurnt = burnt;
								let oldBurnt = burntToBeUpdated.burnt;
								burntToBeUpdated.burnt = oldBurnt + inputtedBurnt;

								models.updateDailyForExercise.post(burntToBeUpdated, query, (err, entry) => {
									if (err) console.log('Error caught at updateDailyForExercise in controllers', err);
									else {
										models.getExerciseEntry.get(query, (err, result) => {
											if (err)
												console.log(
													'Error inside createExerciseEntry in controllers.js at 4th callback',
													err
												);
											else {
												console.log('Database has been updated with new exercise entry');
												res.send(result);
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	},

	// this controller function calls the getExerciseEntry function in models based on 
	// userID and date and retrieves the exercises done on that date. 
	getExerciseEntry: (req, res) => {
		let { user_id, date } = req.query;
		let params = [ user_id, date ];
		models.getExerciseEntry.get(params, (err, result) => {
			if (err) console.log('Error caught on models.getExerciseEntry in controllers', err);
			else res.send(result);
		});
	},

	// this controller function  calls the getDaily function 
	// in models based on user_id && date and returns that day's intake/exertion by the user
	getDaily: (req, res) => {
		let { user_id, date } = req.query;
		let query = [ user_id, date ];
		models.getDaily.get(query, (err, result) => {
			if (err) console.log('Error caught on models.getDaily in controllers', err);
			else res.send(result);
		});
	},

	// this controller function  calls the getDailyByOnlyUser function 
	// in models based on user_id and returns the daily intake/exertion by the user
	getDailyByOnlyUser: (req, res) => {
		let { user_id } = req.query;
		let userID = user_id;
		models.getDailyByOnlyUser.get(userID, (err, result) => {
			if (err) console.log('Error caught in models.getDailyByOnlyUser in controllers', err);
			else res.send(result);
		});
	}
};

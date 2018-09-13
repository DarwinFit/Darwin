const { getExercises, getNutrients } = require('../helpers/apihelpers.js');
const models = require('../models/models.js');
const axios = require('axios');

module.exports = {
  //saving new user in database - WORKS
  createNewUser: (req, res) => {
    // console.log('request received:', req.body);
    models.saveNewUser.post(req.body, (err, results) => { 
      if (err) console.log('Error caught on createNewUser in controller.js', err);
      else res.sendStatus(201);
    });
  },
  //retrieving user's information from database - WORKS
  getUserInfo: (req, res) => {
    // console.log('This is request in get:', req.query.username);
    let { username } = req.query;
    models.getUserInfo.get(username, (err, results) => {
      if (err) {
        console.log('Error caught on getUserInfo in controller.js', err);
        res.sendStatus(404);
      }
      else { res.send(results) }
    });
  },

  //API request for user's food search - WORKS
  searchFoodEntry: (req, res) => {
    // console.log('req.body in search', req.body);
    let {food_name} = req.body;
    getNutrients(food_name, (err, data) => {
      if (err) console.log('Error inside searchFoodEntry in controllers.js', err); 
      else { res.send(data.foods[0]) }
    });
  },
  //when 'add food' is clicked - WORKS
  createFoodEntry: (req, res) => { 
  // console.log('hitting createFoodEntry in controllers', req.body);
    let {food_name, user_id, date} = req.body;
    let query = [user_id, date];
    let body = [food_name, user_id, date];
    let nutrientsToBeUpdated = {};
    //check daily nutrients of user for first entry of the day or just update entry
    models.getDaily.get(query, (err, result) => {
      // console.log('result from getDaily is', result);
      if (err) console.log('Error inside createFoodEntry in controllers.js at 1st callback', err);
      //user is putting in first food entry of the day
      else if (result.length === 0) {
        // console.log('result.length is zero therefore inserting first food of day');
        let { calories, total_fat, total_carbohydrate, protein, sugars, user_id, date } = req.body;
        let params = [0, calories, total_fat, total_carbohydrate, protein, sugars, user_id, date];
        models.firstDailyFoodOrExerciseUpdate.post(params, (err, result) => {
          if (err) console.log('Error inside createFoodEntry in controllers.js at 2nd callback', err);
          else {
            models.insertIntoFoodHistory.post(body, (err, entry) => {
              if (err) console.log('Error inside createFoodEntry in controllers at 3rd callback', err);
              else {
                models.getFoodEntry.get(query, (err, result) => { 
                  if (err) console.log('Error inside createFoodEntry in controllers at 4th callback', err);
                  else res.send(result);
                });
              }
            })
          }
        })
      }
      //updating user's daily intake
      else {
        models.insertIntoFoodHistory.post(body, (err, result) => {
          if (err) console.log('Error caught at insertIntoFoodHistory in controllers', err);
          else {
            models.getDailyForFood.get(query, (err, results) => {
              if (err) console.log('Error caught at getDailyForFood in controllers', err);
              else {
                nutrientsToBeUpdated = results[0];
                let { calories, total_fat, total_carbohydrate, protein, sugars } = req.body;
                let inputtedNutrients = { burnt: 0,
                                          calories: calories,
                                          total_fat: total_fat,
                                          total_carbohydrate: total_carbohydrate,
                                          protein: protein,
                                          sugars: sugars
                                        }
                for (let key in nutrientsToBeUpdated) {
                  let oldNutrient = nutrientsToBeUpdated[key];
                  nutrientsToBeUpdated[key] = oldNutrient + inputtedNutrients[key];
                }

                models.updateDailyForFood.post(nutrientsToBeUpdated, query, (err, entry) => {
                  if (err) console.log('Error caught at updateDailyForFood in controllers', err);
                  else {
                    console.log('Database has been updated with new food entry');
                    res.sendStatus(201);
                  }
                });
              }
            })
          }
        })
      }
    })
  },

  getFoodEntry: (req, res) => {
    // console.log('req in getFoodEntry in controllers', req.query);
    let { user_id, date } = req.query;
    let params = [user_id, date];
    models.getFoodEntry.get(params, (err, result) => {
      if (err) console.log('Error caught on getFoodEntry in controller.js', err);
      else res.send(result);
    });
  },

  //API request - WORKS - FIX SO THAT USER DOESN'T NEED TO INPUT ALL
  searchExerciseEntry: (req, res) => {
    let { username, exercise_name} = req.body;
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
        }
        getExercises(query, (err, data) => {
          if (err) console.log('Error inside getExercises in searchExerciseEntry in controllers', err); 
          else {
            res.send(data.exercises[0]);}
        })
      }
    })
  },
  //when 'add exercise' is clicked
  createExerciseEntry: (req, res) => {
    // console.log('hitting createExerciseEntry in controllers', req.body);
    let {exercise_name, user_id, date, username} = req.body;
    let query = [user_id, date];
    let body = [exercise_name, user_id, date];
    let burntToBeUpdated = {};
    //check daily burnt of user for first entry of the day or just update entry
    models.getDaily.get(query, (err, result) => {
      // console.log('result from getDaily is', result);
      if (err) console.log('Error inside createExerciseEntry in controllers.js at 1st callback', err);
      //user is putting in first exercise entry of the day
      else if (result.length === 0) {
         // console.log('result.length is zero therefore inserting first exercise of day');
        let { burnt, user_id, date } = req.body;
        let params = [burnt, 0, 0, 0, 0, 0, user_id, date];
        models.firstDailyFoodOrExerciseUpdate.post(params, (err, result) => {
          if (err) console.log('Error inside createExerciseEntry in controllers.js at 2nd callback', err);
          else {
            models.insertIntoExerciseHistory.post(body, (err, entry) => {
              if (err) console.log('Error inside createExerciseEntry in controllers.js at 3rd callback', err);
              else {
                models.getExerciseEntry.get(query, (err, result) => {
                  if (err) console.log('Error inside createExerciseEntry in controllers.js at 4th callback', err);
                  else res.send(result);
                });
              }
            })
          }
        })
      }
      //updating user's burnt intake
      else {
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
                    console.log('Database has been updated with new exercise entry');
                    res.sendStatus(201);
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  getExerciseEntry: (req, res) => { //WORKS 
    models.getExerciseEntry.get(req.query, (err, result) => {
      if (err) console.log('Error caught on models.getExerciseEntry in controllers', err);
      else res.send(result);
    });
  },

  getDaily: (req, res) => { //WORKS
    let { user_id, date  } = req.query;
    let query = [user_id, date];
    models.getDaily.get(query, (err, result) => {
      if (err) console.log('Error caught on models.getDaily in controllers', err);
      else res.send(result);
    })
  },
 
  getDailyByOnlyUser: (req, res) => { //WORKS
    let {user_id} = req.query;
    let userID = user_id;
    models.getDailyByOnlyUser.get(userID, (err, result) => {
      if (err) console.log('Error caught in models.getDailyByOnlyUser in controllers', err); 
      else res.send(result); 
    })
  }
};
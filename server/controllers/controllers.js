const { getExercises, getNutrients } = require('../helpers/apihelpers.js');
const models = require('../models/models.js');
const axios = require('axios');

//return requests to client
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
      if (err) console.log('Error caught on getUserInfo in controller.js', err);
      else res.send(results);
    });
  },

  //API request for user's food search - WORKS
  searchFoodEntry: (req, res) => {
    // console.log('req.body in search', req.body);
    let {food_name} = req.body;
    getNutrients(food_name, (err, data) => {
      if (err) console.log('Error inside searchFoodEntry in controllers.js', err); 
      else {
        res.send(data.foods[0])
      }; 
    });
  },
  //when 'add food' is clicked - WORKS
  createFoodEntry: (req, res) => { 
  // console.log('hitting createFoodEntry in controllers', req.body);
    let {user_id, date, food_name} = req.body;
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
        let { burnt, calories, total_fat, total_carbohydrate, protein, sugars, user_id, date } = req.body;
        let params = [burnt, calories, total_fat, total_carbohydrate, protein, sugars, user_id, date];
        models.firstDailyFoodOrExerciseUpdate.post(params, (err, result) => {
          if (err) console.log('Error inside createFoodEntry in controllers.js at 2nd callback', err);
          else {
            models.getFoodEntry.get(req, (err, result) => {
              if (err) console.log('Error inside createFoodEntry in controllers.js at 3rd callback', err);
              else res.send(result);
            });
          }
        })
      }
      //updating user's daily intake
      else {
        models.insertIntoFoodHistory.post(body, (err, result) => {
          if (err) console.log('Error caught at insertIntoFoodHistory in controllers', err);
          models.getDailyForFood.get(query, (err, results) => {
            if (err) console.log('Error caught at getDailyForFood in controllers', err);
            nutrientsToBeUpdated = results[0];
            getNutrients(food_name, (err, data) => {
              if (err) console.log('Error inside getNutrients in createFoodEntry in controllers.js', err);
              for (let key in nutrientsToBeUpdated) {
                let oldNutrient = nutrientsToBeUpdated[key];
                nutrientsToBeUpdated[key] = oldNutrient + data.foods[0][`nf_${key}`];
              }
              models.updateDailyForFood.post(nutrientsToBeUpdated, query, (err, entry) => {
                if (err) console.log('Error caught at updateDailyForFood in controllers', err);
                console.log('Database has been updated with new food entry');
                res.sendStatus(201);
              })
            })
          })
        })
      }
    })
  },

  getFoodEntry: (req, res) => {
    // console.log('req in getFoodEntry in controllers', req.query);
    models.getFoodEntry.get(req.query, (err, result) => {
      if (err) console.log('Error caught on getFoodEntry in controller.js', err);
      else res.send(result);
    });
  },

  //API request - WORKS - FIX SO THAT USER DOESN'T NEED TO INPUT ALL
  searchExerciseEntry: (req, res) => { //req === exercise_name, user_id, date, usernmae
    // console.log('first:', req.body)
    async function userInfo() {
      models.getUserInfo.get(req.body.username, (err, result) => {
        if (err) console.log('Error caught at userInfo in searchExerciseEntry in controllers.js', err);
        console.log('result', result);
        let user = result;
        return user;
      });
    };

    async function getExercise () {
      let userDetails = await userInfo();
      console.log('userDEETS:', userDetails); 
      let query = {query: req.body.exercise_name,
                    gender: userDetails.gender, 
                    weight_kg: userDetails.weight, 
                    height_cm: userDetails.height,
                    age: userDetails.age
                  };
        console.log("query is ", query);
      getExercises(query, (err, data) => {
        if (err) console.log('Error inside searchExerciseEntry in controllers.js', err); 
        else res.send(data.exercises);
      });
    }
    getExercise();
  },

  //when 'add exercise' is clicked
  createExerciseEntry: (req, res) => {
    // console.log('hitting createExerciseEntry in controllers', req.body);
    let {user_id, date, exercise_name} = req.body;
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
        let { burnt, calories, total_fat, total_carbohydrate, protein, sugars, user_id, date } = req.body;
        let params = [burnt, calories, total_fat, total_carbohydrate, protein, sugars, user_id, date];
        models.firstDailyFoodOrExerciseUpdate.post(params, (err, result) => {
          if (err) console.log('Error inside createExerciseEntry in controllers.js at 2nd callback', err);
          else {
            models.getExerciseEntry.get(req, (err, result) => {
              if (err) console.log('Error inside createExerciseEntry in controllers.js at 3rd callback', err);
              else res.send(result);
            });
          }
        })
      }
      //updating user's burnt intake
      else {
        models.insertIntoExerciseHistory.post(body, (err, result) => {
          if (err) console.log('Error caught at insertIntoExerciseHistory in controllers', err);
          models.getDailyForExercise.get(query, (err, results) => {
            if (err) console.log('Error caught at getDailyForExercise in controllers', err);
            burntToBeUpdated = results[0];

            let exerciseQuery = {exercise_name: exercise_name,
              gender: req.body.gender, 
              weight_kg: req.body.weight_kg, 
              height_cm: req.body.height_cm,
              age: req.body.age
            };

            getExercises(exerciseQuery, (err, data) => { //exercise_name needs to filled up properly
              if (err) console.log('Error inside getExercise in createExerciseEntry in controllers.js', err);
              let oldNutrient = burntToBeUpdated[burnt];
              burntToBeUpdated[burnt] = oldNutrient + data.exercise[0]['nf_calories'];
              models.updateDailyForExercise.post(burntToBeUpdated, query, (err, entry) => {
                if (err) console.log('Error caught at updateDailyForExercise in controllers', err);
                console.log('Database has been updated with new exercise entry');
                res.sendStatus(201);
              })
            })
          })
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

  getDailyByOnlyUser: (req, res) => {
    //arjun to fix
    models.getDailyByOnlyUser.get()
  }
};
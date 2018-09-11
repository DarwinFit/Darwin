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
    var { username } = req.query;
    models.getUserInfo.get(username, (err, results) => {
      if (err) console.log('Error caught on getUserInfo in controller.js', err);
      else res.send(results);
    });
  },

  //API request for user's food search 
  searchFoodEntry: (req, res) => {
    let query = req.body; //make sure this is where the searched entry is
    console.log('req.body in search', req.body);
    console.log('req in search', req);
    getNutrients(query, (err, data) => {
      if (err) console.log('Error inside searchFoodEntry in controllers.js', err); 
      else res.send(data); 
    });
  },
  //when 'add food' is clicked
  createFoodEntry: (req, res) => {
  // console.log('hitting createFoodEntry in controllers', req.body);
    let {user_id, date, food_name} = req.body;
    let query = [user_id, date];
    let body = [food_name, user_id, date];
    //check daily nutrients of user for first entry of the day or just update entry
    models.getDaily.get(query, (err, result) => {
      // console.log('result from getDaily is', result);
      if (err) console.log('Error inside createFoodEntry in controllers.js at 1st callback', err);
      //user is putting in first food entry of the day
      else if (result.length === 0) {
        // console.log('result.length is zero therefore inserting first food of day');
        let { burnt, calories, total_fat, carbs, protein, sugars, user_id, date } = req.body;
        let params = [burnt, calories, total_fat, carbs, protein, sugars, user_id, date];
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
        // console.log('user already has a daily row, will update nutrients');
        // models.saveAndUpdateFoodEntry.post(body, (err, result) => {
        //   if (err) console.log('Error inside createFoodEntry in controllers.js at 4th callback', err);
        //   else {
        //     models.getFoodEntry.get(query, (err, result) => {
        //       if (err) console.log('Error inside createFoodEntry in controllers.js at 5th callback', err);
        //       else res.send(result);
        //     })
        //   }
        // })

        models.insertIntoFoodHistory.post(body, (err, result) => {
          if (err) console.log('Error caught at insertIntoFoodHistory in controllers', err);
          models.getDailyForFood.get(query, (err, results) => {
            if (err) console.log('Error caught at getDailyForFood in controllers', err);

            axios.post('/food_history/search', {body})
                .then((data) => {
                  for (let key in data) {
                    results[key] = results[key] + data[key];
                  }
                  models.updateDaily.post(results, query, (err, entry) => {
                    if (err) console.log('Error caught at updateDaily in controllers', err);
                    console.log('Database has been updated with new food entry');
                  })
                })
                .catch((err) => {
                  console.log('Error caught on .catch from axios post in getDailyForFood in controllers', err);
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

  //API request
  searchExerciseEntry: (req, res) => {
    let query = req.body; //Check the request for where all the ie(height/weight) is...
    getExercises(query, (err, data) => {
      if (err) console.log('Error inside searchExerciseEntry', err); 
      else res.send(data);
    });
  },
  //when 'add exercise' is clicked
  createExerciseEntry: (req, res) => {
    // console.log('hitting createExerciseEntry in controllers', req.body);
    let {user_id, date, exercise_name} = req.body;
    let query = [user_id, date];
    let body = [exercise_name, user_id, date];
    //check daily burnt of user for first entry of the day or just update entry
    models.getDaily.get(query, (err, result) => {
      // console.log('result from getDaily is', result);
      if (err) console.log('Error inside createExerciseEntry in controllers.js at 1st callback', err);
      //user is putting in first exercise entry of the day
      else if (result.length === 0) {
         // console.log('result.length is zero therefore inserting first exercise of day');
        let { burnt, calories, total_fat, carbs, protein, sugars, user_id, date } = req.body;
        let params = [burnt, calories, total_fat, carbs, protein, sugars, user_id, date];
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
        // console.log('user already has a daily row, will update burnt');
        models.saveAndUpdateExerciseEntry.post(body, (err, result) => {
          if (err) console.log('Error inside createExerciseEntry in controllers.js at 4th callback', err);
          else {
            models.getExerciseEntry.get(query, (err, result) => {
              if (err) console.log('Error inside createExerciseEntry in controllers.js at 5th callback', err);
              else res.send(result);
            })
          }
        })
      }
    })
  },

  getExerciseEntry: (req, res) => {
    models.getExerciseEntry.get(req.query, (err, result) => {
      if (err) console.log('Error caught on models.getExerciseEntry in controllers', err);
      else res.send(result);
    });
  },

  getDaily: (req, res) => {
    models.getDaily.get(req)
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log('Error caught on models.getDaily in controllers', err);
          });
  }
};
const { getExercises, getNutrients } = require('../helpers/apihelpers.js');
const models = require('../models/models.js');

//return requests to client
module.exports = {
  createNewUser: (req, res) => {
    models.saveNewUser.post(req) //check what req is and what to send to models
          .then((result) => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log('Error caught on models.saveNewUser in controllers', err);
          });
  },

  getUserInfo: (req, res) => {
    console.log('Inside getUserInfo', req.body);
    var username = req.params;  //check where username lives on req
    models.getUserInfo.get(username)
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log('Error caught on models.getUserInfo in controllers', err);
          });
  },

  //API request
  searchFoodEntry: (req, res) => {
    let query = req.body; //make sure this is where the searched entry is
    getNutrients(query, (err, data) => {
      if(err) {
        console.log('Error inside searchFoodEntry', err); 
      } else {
        res.send(data); 
      }
    });
  },

  createFoodEntry: (req, res) => { //when "add" is clicked to add food
    models.getDaily.get(req)
                   .then((result) => {
                     //if no entry has been made for the day, add first entry
                     if (!result) {
                       models.firstDailyFoodOrFoodUpdate.post(req);
                     }
                     else {
                       models.saveAndUpdateFoodEntry.post(req);
                     }
                     models.getFoodEntry.get(req);
                   })
                   .catch((err) => {
                    console.log('Error caught on models.createFoodEntry in controllers', err);
                   });
  },

  getFoodEntry: (req, res) => {
    models.getFoodEntry.get(req)
          .then((results) => {
            res.send(results);
          })
          .catch((err) => {
            console.log('Error caught on models.getFoodEntry in controllers', err);
          });
  },

  //API request
  searchExerciseEntry: (req, res) => {
    let query = req.body; //Check the request for where all the ie(height/weight) is...
    getExercises(query, (err, data) => {
      if(err) {
        console.log('Error inside searchExerciseEntry', err); 
      } else {
        res.send(data); 
      }
    });
  },

  createExerciseEntry: (req, res) => {
    models.getDaily.get(req)
                   .then((results) => {
                     //if no entry has been made for the day, add first entry
                     if (!results) {
                       models.firstDailyFoodOrExerciseUpdate.post(req);
                     }
                     else {
                       models.saveAndUpdateExerciseEntry.post(req);
                     }
                     models.getExerciseEntry.get(req);
                   })
                   .catch((err) => {
                     console.log('Error caught on models.createExerciseEntry in controllers', err);
                   });
  },

  getExerciseEntry: (req, res) => {
    models.getExerciseEntry.get(req)
          .then((results) => {
            res.send(results);
          })
          .catch((err) => {
            console.log('Error caught on models.getExerciseEntry in controllers', err);
          });
  },

  // updateDailyFood: (req, res) => {
  //   //call getDaily to get current nutrient values before updating
  //   models.getDaily(req) //user_id and date
  //         .then(models.updateDailyFood(req)
  //           .then()
  //           .catch((err) => {
  //             console.log('Error caught on models.updateDailyFood in controllers', err);
  //           }));
  // },
  
  // updateDailyExercise: (req, res) => {
  //   models.updateDailyExercise()
  //         .then()
  //         .catch((err) => {
  //           console.log('Error caught on models.updateDailyExercise in controllers', err);
  //         });
  // },

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
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
    var username = req.params;  //check where username lives on req
    models.getUserInfo.get(username)
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log('Error caught on models.getUserInfo in controllers', err);
          });
  },

  searchFoodEntry: (req, res) => {
    let query = req.body //make sure this is where the searched entry is
    getNutrients(query, (err, data) => {
      if(err) {
        console.log('Error inside searchFoodEntry', err); 
      } else {
        res.send(data); 
      }
    })
  },

  createFoodEntry: (req, res) => {
    models.saveFoodEntry.post(req) //check what req is and what to send to models
          .then((result) => {
            this.getFoodEntry()
          })
          .catch((err) => {
            console.log('Error caught on models.createFoodEntry in controllers', err);
          });
  },

  getFoodEntry: (req, res) => {
    models.getFoodEntry()
          .then()
          .catch((err) => {
            console.log('Error caught on models.getFoodEntry in controllers', err);
          });
  },

  searchExerciseEntry: (req, res) => {
    let query = req.body; //Check the request for where all the ie(height/weight) is...
    
    getExercises(query, (err, data) => {
      if(err) {
        console.log('Error inside searchExerciseEntry', err); 
      } else {
        res.send(data); 
      }
    })
  },

  createExerciseEntry: (req, res) => {
    models.saveExerciseEntry()
          .then(() => {
            this.getExerciseEntry()
          })
          .catch((err) => {
            console.log('Error caught on models.createExerciseEntry in controllers', err);
          });
  },

  getExerciseEntry: (req, res) => {
    models.getExerciseEntry()
          .then()
          .catch((err) => {
            console.log('Error caught on models.getExerciseEntry in controllers', err);
          });
  },

  updateDailyFood: (req, res) => {
    //call getDaily to get current nutrient values before updating
    models.updateDailyFood()
          .then()
          .catch((err) => {
            console.log('Error caught on models.updateDailyFood in controllers', err);
          });
  },
  
  updateDailyExercise: (req, res) => {
    models.updateDailyExercise()
          .then()
          .catch((err) => {
            console.log('Error caught on models.updateDailyExercise in controllers', err);
          });
  },

  getDaily: (req, res) => {
    models.getDaily()
          .then()
          .catch((err) => {
            console.log('Error caught on models.getDaily in controllers', err);
          });
  }
};
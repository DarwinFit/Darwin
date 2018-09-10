const { getExercises, getNutrients } = require('../helpers/apihelpers.js');
const models = require('../models/models.js');

//return requests to client
module.exports = {
  createNewUser: (req, res) => {
    models.saveNewUser.post(req.body, (err, results) => { //check what req is and what to send to models
      if (err) console.log('Error caught on createNewUser in controller.js', err);
      else res.sendStatus(201);
    });
  },

  getUserInfo: (req, res) => {
    var username = req.params;  //check where username lives on req
    models.getUserInfo.get(username, (err, results) => {
      if (err) console.log('Error caught on getUserInfo in controller.js', err);
      else res.send(result);
    });
  },

  //API request
  searchFoodEntry: (req, res) => {
    let query = req.body; //make sure this is where the searched entry is
    getNutrients(query, (err, data) => {
      if (err) console.log('Error inside searchFoodEntry in controllers.js', err); 
      else res.send(data); 
    });
  },

  createFoodEntry: (req, res) => { //when "add" is clicked to add food
    models.getDaily.get(req, (err, result) => {
      if (err) console.log('Error inside createFoodEntry in controllers.js at 1st callback', err);
      else if (!result) {
        models.firstDailyFoodOrFoodUpdate.post(req, (err, result) => {
          if (err) console.log('Error inside createFoodEntry in controllers.js at 2nd callback', err);
          else models.getFoodEntry.get(req, (err, result) => {
            if (err) console.log('Error inside createFoodEntry in controllers.js at 3rd callback', err);
            else res.send(result);
          });
        })
      }
      else {
        models.saveAndUpdateFoodEntry.post(req, (err, result) => {
          if (err) console.log('Error inside createFoodEntry in controllers.js at 4th callback', err);
          else {
            models.getFoodEntry.get(req, (err, result) => {
              if (err) console.log('Error inside createFoodEntry in controllers.js at 5th callback', err);
              else res.send(result);
            })
          }
        })
      }
    })
  },

  getFoodEntry: (req, res) => {
    models.getFoodEntry.get(req, (err, result) => {
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

  createExerciseEntry: (req, res) => { //when "add" is clicked to add Exercise
    models.getDaily.get(req, (err, result) => {
      if (err) console.log('Error inside createExerciseEntry in controllers.js at 1st callback', err);
      else if (!result) {
        models.firstDailyFoodOrFoodUpdate.post(req, (err, result) => {
          if (err) console.log('Error inside createExerciseEntry in controllers.js at 2nd callback', err);
          else models.getExerciseEntry.get(req, (err, result) => {
            if (err) console.log('Error inside createExerciseEntry in controllers.js at 3rd callback', err);
            else res.send(result);
          });
        })
      }
      else {
        models.saveAndUpdateExerciseEntry.post(req, (err, result) => {
          if (err) console.log('Error inside createExerciseEntry in controllers.js at 4th callback', err);
          else {
            models.getExerciseEntry.get(req, (err, result) => {
              if (err) console.log('Error inside createExerciseEntry in controllers.js at 5th callback', err);
              else res.send(result);
            })
          }
        })
      }
    })
  },

  getExerciseEntry: (req, res) => {
    models.getExerciseEntry.get(req, (err, result) => {
      if (err) console.log('Error caught on models.getExerciseEntry in controllers', err);
      else res.send(results);
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
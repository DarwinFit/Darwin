const { db } = require('../db');

module.exports = {
  //saving new user to database - WORKS
  saveNewUser: {
    post: (params, callback) => {
      // console.log('inside models saveNewUser', params);
      let query = []; 
      for (let key in params) {
        query.push(params[key])
      }
      let queryStr = `INSERT INTO users (username, age, weight, height, gender, avg_calories) 
                      values (?, ?, ?, ?, ?, ?)`;
      db.query(queryStr, query, (err, result) => {
        if (err) throw err;
        else callback(null, result);
      })
    }
  },

  getUserInfo: {   //WORKS
    get: (username, callback) => {
      console.log('what is username', username);
      let queryStr = `SELECT * FROM users WHERE username = "${username}"`;
      console.log('queryStr', queryStr);
      db.query(queryStr, (err, result) => {
        if (err) throw err;
        // console.log('inside getUserInfo in models:', result);
        callback(err, result);
      })
    }
  },


  insertIntoFoodHistory: {
    post: (params, callback) => {
      console.log('reached insertIntoFoodHistory', params);
      let queryStr = `INSERT INTO food_history (food_name, user_id, date) values (?, ?, ?)`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        callback(result);
      })
    }
  },

  getDailyForFood: {
    get: (params, callback) => {
      let dailyQueryStr = `SELECT calories, total_fat, carbs, protein, sugars FROM daily
                          where user_id = ? AND date = ?`;
      db.query(dailyQueryStr, params, (err, results) => {
        if (err) throw err;
        callback(results);
      })
    }
  },

  updateDaily: {
    post: (params, body, callback) => {
      let {calories, total_fat, carbs, protein, sugars} = params;
      let queryStr = `UPDATE daily SET calories=${calories}, total_fat=${total_fat}, carbs=${carbs}, 
                      protein=${protein}, sugars=${sugars} WHERE user_id = ? AND date = ?`;
      db.query(queryStr, body, (err, result) => {
        if (err) console.log('Error at update in insertFoodHistory saveAndUpdate', err);
        callback(null, result);
      })
    }
  },

  getFoodEntry: {   //WORKS
    get: (query, callback) => {
      let {user_id, date} = query
      let queryStr = `SELECT * FROM food_history WHERE user_id = ? AND date = ?`;
      db.query(queryStr, [user_id, date], (err, result) => {
        if (err) throw err;
        callback(null, result);
      })
    }
  },

  //exercise models
  saveAndUpdateExerciseEntry: {
    post: (body, callback) => {
      let bodySplit = body.slice(1);
      let needToBeUpdated = {};
    
      async function insertExerciseHistory() {
        // console.log('reached saveAndUpdateExerciseEntry in models', body);
        let queryStr = `INSERT INTO exercise_history (exercise_name, user_id, date) value (?, ?, ?)`;
        db.query(queryStr, body, (err, result) => {
          if (err) console.log('Error at insert into exercise_history in async saveAndUpdate', err);

          let dailyQueryStr = `SELECT burnt FROM daily where user_id = ? AND date = ?`;
          db.query(dailyQueryStr, bodySplit, (err, result) => {
            if (err) console.log('Error at select in ExerciseEntry in async saveAndUpdate', err) 
            needToBeUpdated = result;
          })
        })
      }
      insertExerciseHistory().then(() => { 
         //add values from params to get updated daily values
        needToBeUpdated[key] = needToBeUpdated[key] + params[key];
        let {burnt} = needToBeUpdated;
        let queryStr = `UPDATE daily SET burnt=${burnt} WHERE user_id = ? AND date = ?`; 
        db.query(queryStr, bodySplit, (err, result) => {
          if (err) console.log('Error at update in insertExerciseHistory saveAndUpdate', err);
          callback(null, result);
        })
      })
    }
  },

  getExerciseEntry: {   //WORKS
    get: (query, callback) => {
      let {user_id, date} = query
      let queryStr = `SELECT * FROM exercise_history WHERE user_id = ? AND date = ?`;
      db.query(queryStr, [user_id, date], (err, result) => {
        if (err) throw err;
        callback(null, result);
      })
    }
  },

  //first food or exercise input for the day - WORKS
  firstDailyFoodOrExerciseUpdate: {
    post: (params, callback) => {
      console.log('reaching firstDailyFoodOrExerciseUpdate', params);
      let queryStr = `INSERT INTO daily (burnt, calories, total_fat, carbs, protein,
                      sugars, user_id, date) values (?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        callback(null, result);
      })
    }
  },
  //getting daily nutrients - WORKS
  getDaily: {
    get: (query, callback) => {
      // console.log('reaching getDaily in models.js', query);
      let queryStr = `SELECT burnt, calories, total_fat, carbs, protein, sugars FROM daily
                      where user_id = ? AND date = ?`;
      db.query(queryStr, query, (err, result) => {
        // console.log("results in getDaily in models", result);
        if (err) throw err;
        callback(null, result);
      })
    }
  }
};


  //assuming that user has already updatedDaily with first food of the day
  // saveAndUpdateFoodEntry: {
  //   post: (body, callback) => {
  //     let bodySplit = body.slice(1);
  //     let needToBeUpdated = {};

  //     const insertFoodHistory = async () => {
  //       console.log('1');
  //       let insert = await function() {
  //         console.log('2');
  //         let queryStr = `INSERT INTO food_history (food_name, user_id, date) values (?, ?, ?)`;
  //         db.query(queryStr, body, (err, result) => {
  //           console.log('3');
  //           if (err) console.log('Error at insert into food_history in async saveAndUpdate', err);
  //           let dailyQueryStr = `SELECT calories, total_fat, carbs, protein, sugars FROM daily
  //           where user_id = ? AND date = ?`;
  //           db.query(dailyQueryStr, bodySplit, (err, results) => {
  //             console.log('4');
  //             if (err) console.log('Error at select in foodEntry in async saveAndUpdate', err);
  //             needToBeUpdated = results[0];
  //             console.log('needToBeUpdated once its been updated', needToBeUpdated);
  //           })
  //         })
  //       }
 
  //       let update = await function() {
  //         insert();
  //         console.log('5', needToBeUpdated);
  //         //assuming that needToBeUpdated is an object
  //         //iterate through needToBeUpdated and add values from body to get updated daily values
  //         for (let key in needToBeUpdated) {
  //           needToBeUpdated[key] = needToBeUpdated[key] + body[1][key];
  //         }
  //         let {calories, total_fat, carbs, protein, sugars} = needToBeUpdated;
  //         let queryStr = `UPDATE daily SET calories=${calories}, total_fat=${total_fat}, carbs=${carbs}, 
  //                         protein=${protein}, sugars=${sugars} WHERE user_id = ? AND date = ?`; 
  //         db.query(queryStr, bodySplit, (err, result) => {
  //           if (err) console.log('Error at update in insertFoodHistory saveAndUpdate', err);
  //           callback(null, result);
  //         })
  //       }
  //       update();
  //     }
  //     insertFoodHistory();

  //     // async function insertFoodHistory() {
  //     //   // console.log('reached saveAndUpdateFoodEntry in models', body);
  //     //   let queryStr = `INSERT INTO food_history (food_name, user_id, date) values (?, ?, ?)`;
  //     //   db.query(queryStr, body, (err, result) => {
  //     //     if (err) console.log('Error at insert into food_history in async saveAndUpdate', err);

  //     //     let dailyQueryStr = `SELECT calories, total_fat, carbs, protein, sugars FROM daily
  //     //     where user_id = ? AND date = ?`;
  //     //     db.query(dailyQueryStr, bodySplit, (err, results) => {
  //     //       if (err) console.log('Error at select in foodEntry in async saveAndUpdate', err);
  //     //       needToBeUpdated = results;
  //     //     })
  //     //   })
  //     // }
  //     // insertFoodHistory().then(() => {  
  //     //   console.log('wait wait wait until end of async');
  //     //   //assuming that needToBeUpdated is an object
  //     //   //iterate through needToBeUpdated and add values from body to get updated daily values
  //     //   for (let key in needToBeUpdated) {
  //     //     needToBeUpdated[key] = needToBeUpdated[key] + body[key];
  //     //   }
  //     //   let {calories, total_fat, carbs, protein, sugars} = needToBeUpdated;
  //     //   let queryStr = `UPDATE daily SET calories=${calories}, total_fat=${total_fat}, carbs=${carbs}, 
  //     //                   protein=${protein}, sugars=${sugars} WHERE user_id = ? AND date = ?`; 
  //     //   db.query(queryStr, [user_id, date], (err, result) => {
  //     //     if (err) console.log('Error at update in insertFoodHistory saveAndUpdate', err);
  //     //     callback(null, result);
  //     //   })
  //     // })
  //   }
  // },
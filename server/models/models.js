const { db } = require('../db');

module.exports = {
  //users models
  saveNewUser: {
    post: (params, callback) => {
      let {} = params //fill out params
      let queryStr = `INSERT INTO users (username, age, weight, height, gender, avg_calories) 
                      value (?, ?, ?, ?, ?, ?)`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        callback(err, result);
      })
    }
  },

  getUserInfo: {
    get: (username, callback) => {
      let queryStr = `SELECT * FROM users WHERE username = ${username}`;
      db.query(queryStr, (err, result) => {
        if (err) throw err;
        callback(err, result);
      })
    }
  },

  //food models
  //assuming that user has already updatedDaily with first food of the day
  saveAndUpdateFoodEntry: {
    post: (params, callback) => {
      let {user_id, food_name, date} = params;
      let needToBeUpdated = {};
    
      async function pause() {
        let queryStr = `INSERT INTO food_history (food_name, user_id, date) value (?, ?, ?)`;
        db.query(queryStr, [user_id, food_name, date], (err, result) => {
          if (err) throw err;

          let dailyQueryStr = `SELECT calories, total_fat, carbs, protein, sugars FROM daily
          where user_id = ? AND date = ?`;
          db.query(dailyQueryStr, [user_id, date], (err, result) => {
            if (err) throw err; 
            needToBeUpdated = result;
          })
        })
      }
      pause().then(() => {  
        //assuming that needToBeUpdated is an object
        //iterate through needToBeUpdated and add values from params to get updated daily values
        for (let key in needToBeUpdated) {
          needToBeUpdated[key] = needToBeUpdated[key] + params[key];
        }
        let {calories, total_fat, carbs, protein, sugars} = needToBeUpdated;
        let queryStr = `UPDATE daily SET calories=${calories}, total_fat=${total_fat}, carbs=${carbs}, 
                        protein=${protein}, sugars=${sugars} WHERE user_id = ? AND date = ?`; 
        db.query(queryStr, [user_id, date], (err, result) => {
          if (err) throw err;
          callback(null, result);
        })
      })
    }
  },

  getFoodEntry: {
    get: (params, callback) => {
      let {} = params //fill out params
      let queryStr = `SELECT * FROM food_history WHERE user_id = ? AND date = ?`;
      db.query(queryStr, [], (err, result) => {
        if (err) throw err;
        callback(null, result);
      })
    }
  },

  //exercise models
  saveAndUpdateExerciseEntry: {
    post: (params, callback) => {
      let {user_id, exercise_name, date} = params;
      let needToBeUpdated = {};
    
      async function pause() {
        let queryStr = `INSERT INTO exercise_history (exercise_name, user_id, date) value (?, ?, ?)`;
        db.query(queryStr, [user_id, exercise_name, date], (err, result) => {
          if (err) throw err;

          let dailyQueryStr = `SELECT burnt FROM daily where user_id = ? AND date = ?`;
          db.query(dailyQueryStr, [user_id, date], (err, result) => {
            if (err) throw err; 
            needToBeUpdated = result;
          })
        })
      }
      pause().then(() => { 
         //add values from params to get updated daily values
        needToBeUpdated[key] = needToBeUpdated[key] + params[key];
        let {burnt} = needToBeUpdated;
        let queryStr = `UPDATE daily SET burnt=${burnt} WHERE user_id = ? AND date = ?`; 
        db.query(queryStr, [user_id, date], (err, result) => {
          if (err) throw err;
          callback(null, result);
        })
      })
    }
  },

  getExerciseEntry: {
    get: (params, callback) => {
      let {} = params //fill out params
      let queryStr = `SELECT * FROM exercise_history WHERE user_id = ? AND date = ?`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        callback(null, result);
      })
    }
  },

  //daily nutrients models
  firstDailyFoodOrExerciseUpdate: {
    post: (params, callback) => {
      let {} = params //fill out params with either burnt=0 or nutrients=0 depending on what users does first
      let queryStr = `INSERT INTO daily (burnt, calories, total_fat, carbs, protein, sugars)
                      value (?, ?, ?, ?, ?, ?)`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        callback(null, result);
      })
    }
  },

  getDaily: {
    get: (params, callback) => {
      let {} = params //fill out params: want user_id and date
      let queryStr = `SELECT burnt, calories, total_fat, carbs, protein, sugars FROM daily
                      where user_id = ? AND date = ?`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        callback(null, result);
      })
    }
  }
};

  // saveFoodEntry: {
  //   post: (params) => {
  //     let {} = params //fill out params
  //     let queryStr = `INSERT INTO food_history (food_name, user_id, date) value (?, ?, ?)`;
  //     db.query(queryStr, params, (err, result) => {
  //       if (err) throw err;
  //       return result;
  //     })
  //   }
  // },

  // saveExerciseEntry: {
  //   post: (params) => {
  //     let {} = params //fill out params
  //     let queryStr = `INSERT INTO exercise_history (exercise_name, user_id, date) value (?, ?, ?)`;
  //     db.query(queryStr, params, (err, result) => {
  //       if (err) throw err;
  //       return result;
  //     })
  //   }
  // },

  // firstDailyExerciseUpdate: {
  //   post: (params) => {
  //     let {} = params //fill out params
  //     let queryStr = `INSERT INTO daily (calories, total_fat, carbs, protein, sugars)
  //                     value (?, ?, ?, ?, ?)`;
  //     db.query(queryStr, params, (err, result) => {
  //       if (err) throw err;
  //       return result;
  //     })
  //   }
  // },
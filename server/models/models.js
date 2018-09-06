const db = require('../db');

module.exports = {
  saveNewUser: {
    post: (params) => {
      let {} = params //fill out params
      let queryStr = `INSERT INTO users (username, age, weight, height, gender, avg_calories) 
                      value (?, ?, ?, ?, ?, ?)`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        return result;
      })
    }
  },

  getUserInfo: {
    get: (username) => {
      let queryStr = `SELECT * FROM users WHERE username = ${username}`;
      db.query(queryStr, (err, result) => {
        if (err) throw err;
        return result;
      })
    }
  },

  saveFoodEntry: {
    post: (params) => {
      let {} = params //fill out params
      let queryStr = `INSERT INTO food_history (food_name, user_id, date) value (?, ?, ?)`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        return result;
      })
    }
  },

  saveAndUpdateFoodEntry: {
    post: (params) => {
      let {user_id, food_name, date} = params;
      let needToBeUpdated = {};
      let queryStr = `INSERT INTO food_history (food_name, user_id, date) value (?, ?, ?)`;
      
      async function pause() {
        db.query(queryStr, [user_id, food_name, date], (err, result) => {
          if (err) throw err;

          let pullQueryStr = `SELECT burnt, calories, total_fat, carbs, protein, sugars FROM daily
          where user_id = ? AND date = ?`
          db.query(pullQueryStr, [user_id, date], (err, result) => {
            if (err) throw err; 
            needToBeUpdated = result;
          })
        })
      }

      pause().then(() => {
        let {calories, total_fat, carbs, protein, sugars} = params;
        
        for (let key in needToBeUpdated) {
        //inside here we must iterate through need to be updated and add the values from
        //destructured params ^^^ and then use that as the parameter argument in the call 
        }

        let queryStr = `UPDATE FROM daily WHERE user_id = ? AND date =? 
        INSERT INTO daily (burnt, calories, total_fat, carbs, protein, sugars)
                        value (?, ?, ?, ?, ?, ?)`
        db.query(queryStr, needToBeUpdated, (err, result) => {
          if (err) throw err;
          return result;
        })
      })
    }
  },

  getFoodEntry: {
    get: (params) => {
      let {} = params //fill out params
      let queryStr = `SELECT * FROM food_history WHERE user_id = ? AND date = ?`;
      db.query(queryStr, [], (err, result) => {
        if (err) throw err;
        return result;
      })
    }
  },

  saveExerciseEntry: {
    post: (params) => {
      let {} = params //fill out params
      let queryStr = `INSERT INTO exercise_history (exercise_name, user_id, date) value (?, ?, ?)`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        return result;
      })
    }
  },

  getExerciseEntry: {
    get: (params) => {
      let {} = params //fill out params
      let queryStr = `SELECT * FROM exercise_history WHERE user_id = ? AND date = ?`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        return result;
      })
    }
  },

  updateDailyFood: {
    post: (params) => {
      let {} = params //fill out params
      let queryStr = `UPDATE FROM daily WHERE user_id = ? AND date = ?`;
    }
  },

  updateDailyExercise: {
    post: () => {
      
    }
  },

  getDaily: {
    get: (params) => {
      let {} = params //fill out params: want user_id and date
      let queryStr = `SELECT burnt, calories, total_fat, carbs, protein, sugars FROM daily
                      where user_id = ? AND date = ?`;
      db.query(queryStr, params, (err, result) => {
        if (err) throw err;
        return result;
      })
    }
  }
};

//insert first food of the day
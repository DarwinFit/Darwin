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
      let queryStr = `UPDATE  FROM daily WHERE user_id = ? AND date = ?`;
    }
  },

  updateDailyExercise: {
    post: () => {
      
    }
  },

  getDaily: {
    get: () => {
      
    }
  }
};
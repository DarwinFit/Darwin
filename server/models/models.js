const { db } = require('../db');

module.exports = {
	//saving new user to database - WORKS
	saveNewUser: {
		post: (params, callback) => {
			// console.log('inside models saveNewUser', params);
			let query = [];
			// for (let key in params) {
			//   query.push(params[key])
			// }
			let { username, age, weight, height, gender, avg_calories } = params;
			query = [ username, age, weight, height, gender, avg_calories ];
			console.log('THIS ARE THE PARAMS', params);
			let queryStr = `INSERT INTO users (username, age, weight, height, gender, avg_calories) 
                      values (?, ?, ?, ?, ?, ?)`;
			db.query(queryStr, query, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	},

	getUserInfo: {
		//WORKS
		get: (username, callback) => {
			// console.log('what is username in getUserInfo in models', username);
			let queryStr = `SELECT * FROM users WHERE username = "${username}"`;
			console.log(username);
			db.query(queryStr, (err, result) => {
				if (err) throw err;
				callback(null, result);
			});
		}
	},

	insertIntoFoodHistory: {
		//WORKS
		post: (params, callback) => {
			// console.log('params in insertIntoFoodHistory', params);
			let queryStr = `INSERT INTO food_history (food_name, user_id, date) values (?, ?, ?)`;
			db.query(queryStr, params, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	},

	getDailyForFood: {
		//WORKS
		get: (params, callback) => {
			// console.log('params in getDailyForFood', params);
			let dailyQueryStr = `SELECT calories, total_fat, total_carbohydrate, protein, sugars FROM daily
                          WHERE user_id = ? AND date = ?`;
			db.query(dailyQueryStr, params, (err, results) => {
				if (err) throw err;
				else callback(null, results);
			});
		}
	},

	updateDailyForFood: {
		//WORKS
		post: (params, body, callback) => {
			// console.log('params in updateDailyForFood', params);
			// console.log('body in updateDailyForFood', body);
			let { calories, total_fat, total_carbohydrate, protein, sugars } = params;
			let queryStr = `UPDATE daily SET calories=${calories}, total_fat=${total_fat}, total_carbohydrate=${total_carbohydrate}, 
                      protein=${protein}, sugars=${sugars} WHERE user_id = ? AND date = ?`;
			db.query(queryStr, body, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	},

	getFoodEntry: {
		//WORKS
		get: (query, callback) => {
			let queryStr = `SELECT * FROM food_history WHERE user_id = ? AND date = ?`;
			db.query(queryStr, query, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	},

	//exercise models--------
	// this model function inserts data into the exerciseHistory table with user_id, and date
	insertIntoExerciseHistory: {
		post: (params, callback) => {
			// console.log('params in insertIntoExerciseHistory', params);
			let queryStr = `INSERT INTO exercise_history (exercise_name, user_id, date) values (?, ?, ?)`;
			db.query(queryStr, params, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	},

	// this model function pulls out the burnt calories done on a particular DATE and for a particular USER
	getDailyForExercise: {
		get: (params, callback) => {
			// console.log('params in getDailyForExercise', params);
			let dailyQueryStr = `SELECT burnt FROM daily WHERE user_id = ? AND date = ?`;
			db.query(dailyQueryStr, params, (err, results) => {
				if (err) throw err;
				else callback(null, results);
			});
		}
	},

	//this model function adds onto the previously burnt count in the daily table
	updateDailyForExercise: {
		post: (params, body, callback) => {
			// console.log('params in updateDailyForExercise', params);
			// console.log('body in updateDailyForExercise', body);
			let { burnt } = params;
			let queryStr = `UPDATE daily SET burnt=${burnt} WHERE user_id = ? AND date = ?`;
			db.query(queryStr, body, (err, result) => {
				if (err) console.log('Error at updateDailyForExercise in models.js', err);
				else callback(null, result);
			});
		}
	},

	// this model function selects all the exercises from the exercise history based on user_id and date
	getExerciseEntry: {
		//WORKS
		get: (query, callback) => {
			let queryStr = `SELECT * FROM exercise_history WHERE user_id = ? AND date = ?`;
			db.query(queryStr, query, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	},

	//first food or exercise input for the day gets added into the daily table with the user_id and date included 
	firstDailyFoodOrExerciseUpdate: {
		post: (params, callback) => {
			// console.log('reaching firstDailyFoodOrExerciseUpdate', params);
			let queryStr = `INSERT INTO daily (burnt, calories, total_fat, total_carbohydrate, protein,
                      sugars, user_id, date) values (?, ?, ?, ?, ?, ?, ?, ?)`;
			db.query(queryStr, params, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	},

	//getting daily nutrients from daily based on user_id and date. 
	getDaily: {
		get: (query, callback) => {
			// console.log('reaching getDaily in models.js', query);

			let queryStr = `SELECT burnt, calories, total_fat, total_carbohydrate, protein, sugars FROM daily
                      where user_id = ? AND date = ?`;
			db.query(queryStr, query, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	},

	//retrieve daily entries from daily table by user_id only
	getDailyByOnlyUser: {
		get: (userID, callback) => {
			let queryStr = `SELECT * FROM daily WHERE user_id = ?`;
			db.query(queryStr, userID, (err, result) => {
				if (err) throw err;
				else callback(null, result);
			});
		}
	}
};

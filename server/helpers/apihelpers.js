const axios = require('axios'); 
const { APPID, APIKEY } = require('../../config.js');

let getNutrients = (query, callback) => {
  var requestConfig = {
		method: 'POST',
		url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
		headers: {
			'x-app-id': `${APPID}`,
			'x-app-key': `${APIKEY}`,
			'x-app-remote-id': '0'
		},
		data: {
			query: `${query}`,
			timezone: 'US/Eastern'
		}
	};
  axios(requestConfig)
      .then(({ data }) => callback(null, data))
      .catch((err) => console.log('Error inside APIHELPER/nutrition:', err));
}

let getExercises = (query, callback) => {
	var requestConfig = {
		method: 'POST',
		url: 'https://trackapi.nutritionix.com/v2/natural/exercise',
		headers: {
			'x-app-id': `${APPID}`,
			'x-app-key': `${APIKEY}`,
			'x-app-remote-id': '0'
		},
		data: {
			query: `${query.exercise_name}`,
			gender: `${query.gender}`,
			weight_kg: `${query.weight_kg}`,
			height_cm: `${query.height_cm}`,
			age: `${query.age}`
		}
  };
  
	axios(requestConfig)
		.then(({ data }) => callback(null, data))
		.catch((err) => console.log('Error inside APIHELPER/exercise:', err));
};

module.exports = { getExercises, getNutrients }
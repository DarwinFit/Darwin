const axios = require('axios');
let APPID;
let APIKEY;
try {
  APPID = require('../../config.js').APPID;
  APIKEY = require('../../config.js').APIKEY;
} catch (err) {
  APPID = process.env.APPID;
  APIKEY = process.env.APIKEY;
}

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
};

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

module.exports = { getExercises, getNutrients };

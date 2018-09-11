const axios = require('axios'); 
const { APPID, APIKEY } = require('../../config.js');

let getNutrients = (query, callback) => {
  let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`; 
  let options = {
    headers: {
      'Content-Type': 'application/json', 
      'x-app-id': `${APPID}`, 
      'x-app-key': `${APIKEY}`,
      'x-remote-user-id': '0'
    },
    data: {
      'query': `${query}`,
      'timezone': 'US/Eastern/Berlin',
      'use_branded_foods': false
    }
  };
  axios.post(url, options)
      .then((response) => callback(null, response))
      .catch((err) => console.log('Error inside APIHELPER/nutrition:', err)); 
}

let getExercises = (query, callback) => {
  let url = `https://trackapi.nutritionix.com/v2/natural/exercise`; 
  //destructure query here into query/gender/weight/height/age
  
  let options = {
    headers: {
      'Content-Type': 'application/json', 
      'x-app-id': `${APPID}`, 
      'x-app-key': `${APIKEY}`,
      'x-remote-user-id': '0'
    },
    data: {
      'query': ``,
      "gender": ``,
      "weight_kg": ``,
      "height_cm": ``,
      "age": ``
     }
  };
  axios.post(url, options)
      .then((response) => callback(null, response))
      .catch((err)=> console.log('Error inside APIHELPER/exercise:', err)); 
};

module.exports = { getExercises, getNutrients }
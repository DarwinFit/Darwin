const router = require('express').Router();
const controllers = require('./controllers/controllers.js');

// route different request to different endpoints
router.get('/users', controllers.getUserInfo); 
router.post('/users', controllers.createNewUser); //front-end should send all info inputted from user

/////START WORKING WITH THIS TOMORROW START TESTING!!

router.post('/food_history/search', controllers.searchFoodEntry);
router.post('/exercise_history/search', controllers.searchExerciseEntry);

router.post('/food_history', controllers.createFoodEntry);
router.get('/food_history', controllers.getFoodEntry); 

router.post('/exercise_history', controllers.createExerciseEntry);
router.get('/exercise_history', controllers.getExerciseEntry);

router.get('/daily', controllers.getDaily);

module.exports = router;
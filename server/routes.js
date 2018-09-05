const router = require('express').Router();
const controllers = require('./controllers/controllers.js');

//route different request to different endpoints
router.get('/users', controllers.getUserInfo);
router.post('/users', controllers.createNewUser);

router.post('/food_history', controllers.searchFoodEntry);
router.post('/food_history', controllers.createFoodEntry);
router.get('/food_history', controllers.getFoodEntry);

router.post('/exercise_history', controllers.searchExerciseEntry);
router.post('/exercise_history', controllers.createExerciseEntry);
router.get('/exercise_history', controllers.getExerciseEntry);

router.post('/daily', controllers.updateDailyFood);
router.post('/daily', controllers.updateDailyExercise);
router.get('/daily', controllers.getDaily);

module.exports = router;
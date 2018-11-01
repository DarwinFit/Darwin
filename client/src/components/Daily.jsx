import React from 'react';

import DailyNutrition from './DailyNutrition.jsx';
import CalorieGraph from './CalorieGraph.jsx';

const Daily = ({ username, dailyNutrition, intake, burnt, userData }) => (
	<div>
		<DailyNutrition username={username} dailyNutrition={dailyNutrition} />
		<CalorieGraph dailyNutrition={dailyNutrition} userData={userData} burnt={burnt} intake={intake} />
	</div>
);

export default Daily;

import React from 'react';

import DailyNutrition from './DailyNutrition.jsx';
import CalorieGraph from './CalorieGraph.jsx';

const Daily = ({ username, dailyNutrition, intakeData, burntData, userData }) => (
	<div>
		<DailyNutrition username={username} dailyNutrition={dailyNutrition} />
		<CalorieGraph dailyNutrition={dailyNutrition} userData={userData}/>
	</div>
);

export default Daily;

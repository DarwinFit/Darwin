import React from 'react';

import DailyNutrition from './DailyNutrition.jsx';
import CalorieGraph from './CalorieGraph.jsx';

const Daily = ({ username, dailyNutrition }) => (
	<div>
		<DailyNutrition username={username} dailyNutrition={dailyNutrition} />
		<CalorieGraph />
	</div>
);

export default Daily;

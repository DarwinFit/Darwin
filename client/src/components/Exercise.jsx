import React from 'react';

import Search from './Search.jsx';
import ExerciseDetails from './ExerciseDetails.jsx';
import LogList from './LogList.jsx';

const Exercise = ({ username, exerciseData, items, handleAddExercise, searchExercise }) => (
	<div className="Container">
		<Search search={searchExercise} type="exercise" />
		<ExerciseDetails username={username} exerciseData={exerciseData} handleAddExercise={handleAddExercise} />
		<LogList items={items} />
	</div>
);

export default Exercise;

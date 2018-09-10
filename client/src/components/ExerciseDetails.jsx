import React, { Component } from 'react';

const ExerciseDetail = ({ username, exerciseData, handleAddExercise }) => {
	return (
		//creating a div with className for future styling
		//Inside of it, we displaying the username which was passed in by props, with the exercise results for searched exercise
		//Adding a button to handle adding it to the list of the exercises by executing the function from the main component
		<div className="exerciseDetail">
			<p>
				During your exercise you will spend {exerciseData.duration_min} minutes {exerciseData.name} and you will
				burn {exerciseData.nf_calories} !
			</p>
			<br />
			<button className="AddButton" onClick={handleAddExercise}>
				Add
			</button>
		</div>
	);
};

export default ExerciseDetail;

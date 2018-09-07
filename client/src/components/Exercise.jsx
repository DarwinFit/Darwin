import React, { Component } from 'react';
import Search from './Search.jsx';
import ExerciseDetails from './ExerciseDetails.jsx';
import LogList from './LogList.jsx';

const Exercise = (props) => {
	//create div with container class, for styling in the future
	//import and insert the needed subcomponents
	//pass the expected by each sub-component values and functions
	return (
		<div className="Container">
			<Search onSearch={props.onSearch} showFood={props.showFood} />
			<ExerciseDetails
				username={props.username}
				exerciseData={props.exerciseData}
				handleAddExercise={props.handleAddExercise}
			/>
			<LogList items={props.items} onDelete={props.onDelete} />
		</div>
	);
};

export default Exercise;

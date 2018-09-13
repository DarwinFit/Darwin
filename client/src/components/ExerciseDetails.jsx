import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import '../css/PopUpStyle.css';

const ExerciseDetail = ({ username, exerciseData, handleAddExercise }) => {
	return (
		//creating a div with className for future styling
		//Inside of it, we displaying the username which was passed in by props, with the exercise results for searched exercise
		//Adding a button to handle adding it to the list of the exercises by executing the function from the main component
		<div className="exerciseDetail">
			<h2>Hey ,{username}, below are the details of your searched exercise results!</h2>

			<div>
				{exerciseData.name.length > 1 ? (
					<p>
						You will spend {exerciseData.duration_min} min {exerciseData.name} and you will burn{' '}
						{exerciseData.nf_calories} calories.
					</p>
				) : (
					''
				)}
			</div>
			<Popup trigger={<button>Add</button>} modal>
				{(close) => (
					<div className="styles.modal">
						<div className="styles.content">
							<h3> Are you sure you want to add this exercise to your list?</h3>
						</div>
						<div className="styles.actions">
							<button className="styles.button" onClick={handleAddExercise}>
								{' '}
								Add{' '}
							</button>
						</div>
						<div className="styles.actions">
							<button
								className="styles.button"
								onClick={() => {
									console.log('modal closed ');
									close();
								}}
							>
								Close
							</button>
						</div>
					</div>
				)}
			</Popup>
		</div>
	);
};

export default ExerciseDetail;

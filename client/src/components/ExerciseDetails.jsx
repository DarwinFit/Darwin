import React, { Component } from 'react';
import Popup from 'reactjs-popup';
// import '../css/PopUpStyle.css';

const ExerciseDetail = ({ username, exerciseData, handleAddExercise }) => {
	return (
		//creating a div with className for future styling
		//Inside of it, we displaying the username which was passed in by props, with the exercise results for searched exercise
		//Adding a button to handle adding it to the list of the exercises by executing the function from the main component
		<div className="exerciseDetail">
			{/* <h2 className="exercise-detail-title">Hey {username}, below are the details of your searched exercise results!</h2> */}

			<div>
				<div className="cards-exercise">
				<div className="card-exercise">
					<ul className="card-exercise-calorie">
						<li className="nutrition-num">{Math.round(exerciseData.nf_calories)}</li>
						<li className="nutrition-unit">kcal</li>
					</ul>
					<p className="nutrition-name">Calories Burnt</p>
				</div></div>
			</div>
			<div className="add-bar">
				<h5 className="add-bar-name">
					Exercise Summary for {exerciseData.duration_min} minute(s) of {exerciseData.name || '...'}
				</h5>
			<Popup trigger={<button className="add-bar-button">Add</button>} modal>
				{(close) => (
					<div className="modal">
						<div className="content">
							<h3> Are you sure you want to add this exercise to your list?</h3>
						</div>
						<div className="actions">
							<button
								className="button"
								onClick={() => {
									handleAddExercise();
									close();
								}}
							>
								{' '}
								Add{' '}
							</button>
						</div>
						<div className="actions">
							<button
								className="button"
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
			</Popup></div>
		</div>
	);
};

export default ExerciseDetail;

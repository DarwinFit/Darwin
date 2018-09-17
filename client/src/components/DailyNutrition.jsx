import React, { Component } from 'react';
import { Card, CardText, CardBody, h1, h2 } from 'reactstrap';
import { Row, Col } from 'react-bootstrap';

const DailyNutrition = ({ username, dailyNutrition }) => {
	console.log(dailyNutrition.sugars);
	return (
		<div className="daily-nutrition-container">
			<h2 className="card-title">Daily Nutritional Summary</h2>
			<div className="cards-daily">
				<div className="card-daily">
					<ul className="card-daily-calorie">
						<li className="nutrition-num">{dailyNutrition.burnt}</li>
						<li className="nutrition-unit">kcal</li>
					</ul>
					<div className="nutrition-name">Calories Burnt</div>
				</div>
				<div className="card-daily">
					<ul className="card-daily-calorie">
						<li className="nutrition-num">{dailyNutrition.calories}</li>
						<li className="nutrition-unit">kcal</li>
					</ul>
					<p className="nutrition-name">Calories Intake</p>
				</div>
				<div className="card-daily">
					<ul className="card-daily-calorie">
						<li className="nutrition-num">{dailyNutrition.fat}</li>
						<li className="nutrition-unit">g</li>
					</ul>
					<p className="nutrition-name">Fat</p>
				</div>
				<div className="card-daily">
					<ul className="card-daily-calorie">
						<li className="nutrition-num">{dailyNutrition.carbs}</li>
						<li className="nutrition-unit">g</li>
					</ul>
					<p className="nutrition-name">Carbohydrates</p>
				</div>
				<div className="card-daily">
					<ul className="card-daily-calorie">
						<li className="nutrition-num">{dailyNutrition.protein}</li>
						<li className="nutrition-unit">g</li>
					</ul>
					<p className="nutrition-name">Proteins</p>
				</div>
				<div className="card-daily">
					<ul className="card-daily-calorie">
						<li className="nutrition-num">{dailyNutrition.sugars}</li>
						<li className="nutrition-unit">g</li>
					</ul>
					<p className="nutrition-name">Sugar</p>
				</div>
			</div>		
		</div>
	);
};

export default DailyNutrition;

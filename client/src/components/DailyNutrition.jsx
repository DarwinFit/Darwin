import React, { Component } from 'react';
import { Card, CardText, CardBody, h1, CardSubtitle } from 'reactstrap';
import { Row, Col } from 'react-bootstrap';

const DailyNutrition = ({ username, dailyNutrition }) => {
	return (
		<div className="NutritionFacts container">
			<h2>Daily Nutritional Summary</h2>
			<Row>
				<Col md={2}>
					<Card className="border-0 border-dark">
						<CardBody>
							<h1 className="text-left">{dailyNutrition.burnt}</h1>
							<CardSubtitle className="text-right">kcal</CardSubtitle>
						</CardBody>
						<CardBody>
							<h4 className="text-right">Calories Used(Recomended Daily intake + exercises)</h4>
						</CardBody>
					</Card>
				</Col>
				<Col md={2}>
					<Card className="border-0 border-dark">
						<CardBody>
							<h1 className="text-left">{dailyNutrition.calories}</h1>
							<CardSubtitle className="text-right">kcal</CardSubtitle>
						</CardBody>
						<CardBody>
							<h4 className="text-right">Calories</h4>
						</CardBody>
					</Card>
				</Col>
				<Col md={2}>
					<Card>
						<CardBody>
							<h1 className="text-left">{dailyNutrition.fat}</h1>
							<CardSubtitle className="text-right">g</CardSubtitle>
						</CardBody>
						<CardBody>
							<h4 className="text-right">Fat</h4>
						</CardBody>
					</Card>
				</Col>

				<Col md={2}>
					<Card>
						<CardBody>
							<h1 className="text-left">{dailyNutrition.carbs}</h1>
							<CardSubtitle className="text-right">g</CardSubtitle>
						</CardBody>
						<CardBody>
							<h4 className="text-right">Carbohydrates</h4>
						</CardBody>
					</Card>
				</Col>

				<Col md={2}>
					<Card>
						<CardBody>
							<h1 className="text-left">{dailyNutrition.protein}</h1>
							<CardSubtitle className="text-right">g</CardSubtitle>
						</CardBody>
						<CardBody>
							<h4 className="text-right">Proteins</h4>
						</CardBody>
					</Card>
				</Col>

				<Col md={2}>
					<Card>
						<CardBody>
							<h1 className="text-left">{dailyNutrition.sugars}</h1>
							<CardSubtitle className="text-right">g</CardSubtitle>
						</CardBody>
						<CardBody>
							<h4 className="text-right">Sugar</h4>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default DailyNutrition;

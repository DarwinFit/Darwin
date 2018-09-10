import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Row, Col } from 'react-bootstrap';

const DailyNutrition = ({ username, dailyNutrition }) => {
  return (
		<div className="NutritionFacts">
			<h2>Daily Nutritional Summary</h2>

      <Row>
        <Col md="2"> 
          <Card>
            <CardBody>
              <CardTitle>{dailyNutrition.calories}</CardTitle>
              <CardSubtitle>kcal</CardSubtitle>
            </CardBody>
            {/* <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
            <CardBody>
              <CardText>Calories</CardText>
              {/* <CardLink href="#">Card Link</CardLink>
              <CardLink href="#">Another Link</CardLink> */}
            </CardBody>
          </Card>
        </Col>

        <Col md="2">
          <Card>
            <CardBody>
              <CardTitle>{dailyNutrition.fat}</CardTitle>
              <CardSubtitle>g</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Fat</CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md="2">
          <Card>
            <CardBody>
              <CardTitle>{dailyNutrition.carbs}</CardTitle>
              <CardSubtitle>g</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Carbohydrates</CardText>
            </CardBody>
          </Card>
        </Col>
        
        <Col md="2"> 
          <Card>
            <CardBody>
              <CardTitle>{dailyNutrition.protein}</CardTitle>
              <CardSubtitle>g</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Proteins</CardText>
            </CardBody>
          </Card>
        </Col>
        
        <Col md="2">
          <Card>
            <CardBody>
              <CardTitle>{dailyNutrition.sugar}</CardTitle>
              <CardSubtitle>g</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Sugar</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

			{/* <table>
        <tbody>
          <tr>
            <td>Calories</td>
            <td>{dailyNutrition.calories} kcal</td>
          </tr>
          <tr>
            <td>Total Fat</td>
            <td>
              {dailyNutrition.fat} g
            </td>
          </tr>
          <tr>
            <td>Total Carbohydrates</td>
            <td>{dailyNutrition.carbs} g</td>
          </tr>
          <tr>
            <td>Sugars</td>
            <td>{dailyNutrition.sugar} g</td>
          </tr>
        </tbody>
			</table> */}
		</div>
	);
};

export default DailyNutrition;

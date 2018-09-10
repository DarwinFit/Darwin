import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Row, Col } from 'react-bootstrap';

const FoodNutrition = ({ username, foodNutrition }) => {
  return (
		<div className="NutritionFacts">
      <Row>
        <Col md={2}> 
          <Card>
            <CardBody>
              <CardTitle>{foodNutrition.calories}</CardTitle>
              <CardSubtitle>kcal</CardSubtitle>
            </CardBody>
            <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardText>Calories</CardText>
              {/* <CardLink href="#">Card Link</CardLink>
              <CardLink href="#">Another Link</CardLink> */}
            </CardBody>
          </Card>
        </Col>

        <Col md={2}>
          <Card>
            <CardBody>
              <CardTitle>{foodNutrition.fat}</CardTitle>
              <CardSubtitle>g</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Fat</CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md={2}>
          <Card>
            <CardBody>
              <CardTitle>{foodNutrition.carbs}</CardTitle>
              <CardSubtitle>g</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Carbohydrates</CardText>
            </CardBody>
          </Card>
        </Col>
        
        <Col md={2}> 
          <Card>
            <CardBody>
              <CardTitle>{foodNutrition.protein}</CardTitle>
              <CardSubtitle>g</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Proteins</CardText>
            </CardBody>
          </Card>
        </Col>
        
        <Col md={2}>
          <Card>
            <CardBody>
              <CardTitle>{foodNutrition.sugar}</CardTitle>
              <CardSubtitle>g</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Sugar</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <h3>
        Nutritional Summary for {foodNutrition.serving_qty} (about {foodNutrition.serving_wt_g} g) of {foodNutrition.name}
      </h3>
      <button>Add</button>
		</div>
	);
};

export default FoodNutrition;

import React, { Component } from 'react';
import Popup from 'reactjs-popup';
// import '../css/PopUpStyle.css';

const FoodNutrition = ({ username, foodNutrition, handleAddFood }) => {
  return (
    <div>
      <div className="NutritionFacts">
        <div className="cards-food">
          <div className="card-food">
            <ul className="card-food-calorie">
              <li className="nutrition-num">{Math.round(foodNutrition.calories)}</li>
              <li className="nutrition-unit">kcal</li>
            </ul>
            <p className="nutrition-name">Calories Intake</p>
          </div>
          <div className="card-food">
            <ul className="card-food-calorie">
              <li className="nutrition-num">{Math.round(foodNutrition.fat)}</li>
              <li className="nutrition-unit">g</li>
            </ul>
            <p className="nutrition-name">Fat</p>
          </div>
          <div className="card-food">
            <ul className="card-food-calorie">
              <li className="nutrition-num">{Math.round(foodNutrition.carbs)}</li>
              <li className="nutrition-unit">g</li>
            </ul>
            <p className="nutrition-name">Carbohydrates</p>
          </div>
          <div className="card-food">
            <ul className="card-food-calorie">
              <li className="nutrition-num">{Math.round(foodNutrition.protein)}</li>
              <li className="nutrition-unit">g</li>
            </ul>
            <p className="nutrition-name">Proteins</p>
          </div>
          <div className="card-food">
            <ul className="card-food-calorie">
              <li className="nutrition-num">{Math.round(foodNutrition.sugars)}</li>
              <li className="nutrition-unit">g</li>
            </ul>
            <p className="nutrition-name">Sugar</p>
          </div>
        </div>
      </div>
      <div className="add-bar">
        <h5 className="add-bar-name">
          Nutritional Summary for {foodNutrition.serving_qty} {foodNutrition.name || '...'} (about{' '}
          {foodNutrition.serving_wt_g} g)
        </h5>
        <Popup trigger={<button className="add-bar-button">Add</button>} modal>
          {(close) => (
            <div className="modal">
              <div className="content">
                <h2>Are you sure you want to add {foodNutrition.name} to the list? </h2>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    handleAddFood();
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
        </Popup>
      </div>
    </div>
  );
};

export default FoodNutrition;

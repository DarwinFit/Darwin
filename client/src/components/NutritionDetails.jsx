import React, { Component } from 'react';

const NutritionDetails = ({ username, food_nutrition, handleAddFood }) => {
	//creating a div to hold the Nutrition facts table, we are assuming that username is passed to this component, as well as food_nutrition
	//Creating a button which on click would handle adding the food data to the array of daily total;
	//we are assuming that the the handleaddfood is passed to the component and takes in the data object;
	return (
		<div className="NutritionFacts">
			<h2>
				Here you go, {username}, the facts about your searched {food_nutrition.food_name}:
			</h2>
			<p>
				Serving size: {food_nutrition.serving_qty} (about {food_nutrition.serving_weight_grams} g)
			</p>
			<table>
				<tr>
					<td>
						<th>Calories</th>
					</td>
					<td />
					<td>
						<th>{food_nutrition.calories}</th>
					</td>
				</tr>
				<tr>
					<td>
						<th>Total Fat</th>
					</td>
					<td />
					<td>
						<th>{food_nutrition.fat} g</th>
					</td>
				</tr>
				<tr>
					<td>
						<th>Total Carbohydrates </th>
					</td>
					<td />
					<td>
						<th>{food_nutrition.carbs} g</th>
					</td>
				</tr>
				<tr>
					<td>
						<th>Sugars</th>
					</td>
					<td />
					<td>
						<th>{food_nutrition.sugar} g</th>
					</td>
				</tr>
			</table>
			<button className="AddButton" onClick={handleAddFood({ food_nutrition })}>
				Add {food_nutrition.name} to my daily list!
			</button>
		</div>
	);
};

export default NutritionDetails;

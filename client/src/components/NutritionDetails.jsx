import React, { Component } from 'react';

const NutritionDetails = ({ foodData }) => {
	return (
		<div className="NutritionFacts">
			<h2>
				Here you go, {this.props.username}, the facts about your searched {foodData.food_name}:
			</h2>
			<p>
				Serving size: {foodData.serving_qty} (about {foodData.serving_weight_grams} g)
			</p>
			<table>
				<tr>
					<td>
						<th>Calories</th>
					</td>
					<td />
					<td>
						<th>{foodData.nf_calories}</th>
					</td>
				</tr>
				<tr>
					<td>
						<th>Total Fat</th>
					</td>
					<td />
					<td>
						<th>{foodData.nf_total_fat} g</th>
					</td>
				</tr>
				<tr>
					<td>
						<th>Total Carbohydrates </th>
					</td>
					<td />
					<td>
						<th>{foodData.nf_total_carbohydrate} g</th>
					</td>
				</tr>
				<tr>
					<td>
						<th>Sugars</th>
					</td>
					<td />
					<td>
						<th>{foodData.nf_sugars} g</th>
					</td>
				</tr>
				<tr>
					<td>
						<th>Sodium</th>
					</td>
					<td />
					<td>
						<th>{foodData.nf_sodium} mg</th>
					</td>
				</tr>
			</table>
			<button className="AddButton" onClick={this.props.handleAddFood({ foodData })}>
				Add {foodData.food_name} to my daily list!
			</button>
		</div>
	);
};

export default NutritionDetails;

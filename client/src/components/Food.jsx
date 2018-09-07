import React, { Component } from 'react';
import Search from './Search.jsx';
import LogList from './LogList.jsx';
import NutritionDetails from './NutritionDetails.jsx';

const Food = (props) => {
	//created a div with classname for future styling of the food page
	//import and insert the needed components from smaller ones, pass the expected props and functions to it.
	return (
		<div className="Container">
			<Search onSearch={props.onSearch} type={true} />
			<NutritionDetails foodData={props.foodData} username={props.username} handleAddFood={props.handleAddFood} />
			<LogList items={props.items} onDelete={props.onDelete} />
		</div>
	);
};

export default Food;

import React from 'react';

import FoodNutrition from './FoodNutrition.jsx';
import Search from './Search.jsx';
import LogList from './LogList.jsx';

const Food = ({ username, foodNutrition, items, searchFood, handleAddFood }) => (
  <div>
    <Search search={searchFood} type="food" />
    <FoodNutrition
      username={username}
      handleAddFood={handleAddFood}
      foodNutrition={foodNutrition}
    />
    <LogList items={items} />
  </div>
);

export default Food;

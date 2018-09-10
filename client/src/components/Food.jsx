import React from 'react';

import FoodNutrition from './FoodNutrition.jsx';
import Search from './Search.jsx';
import LogList from './LogList.jsx';

const Food = ({username, foodNutrition, items, onDelete}) => (
  <div>
    <Search />
    <FoodNutrition 
      username={username}
      foodNutrition={foodNutrition} />
    <LogList
      items={items}
      onDelete={onDelete} />
  </div>
);

export default Food;

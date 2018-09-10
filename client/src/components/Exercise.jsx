import React from 'react';

import Search from './Search.jsx';
import ExerciseDetails from './ExerciseDetails.jsx';
import LogList from './LogList.jsx';

const Exercise = ({username, exerciseData, items, 
                    handleAddExercise, onDelete}) => (
  <div className="Container">
    <Search showFood={true} />
    <ExerciseDetails
      username={username}
      exerciseData={exerciseData}
      handleAddExercise={handleAddExercise}
    />
    <LogList items={items} onDelete={onDelete} />
	</div>
);

export default Exercise;

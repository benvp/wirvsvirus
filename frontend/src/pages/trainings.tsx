import React from 'react';
import { TrainingsList } from '../containers/trainings/TrainingsList';

type TrainingsProps = {};

const Trainings: React.FC<TrainingsProps> = () => {
  return <TrainingsList trainings={[]} />;
};

export default Trainings;

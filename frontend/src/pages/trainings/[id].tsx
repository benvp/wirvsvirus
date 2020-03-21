import React from 'react';
import { TrainingCard } from '@@/containers/trainings/TrainingCard';
import { requireAuth } from '@@components/auth/auth';

type TrainingPageProps = {};

const TrainingPage: React.FC<TrainingPageProps> = () => {
  return <TrainingCard />;
};

export default requireAuth(TrainingPage);

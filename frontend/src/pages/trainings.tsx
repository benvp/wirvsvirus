import React from 'react';
import { TrainingsList } from '../containers/trainings/TrainingsList';
import { PageHeader } from '@@components/PageHeader/PageHeader';
import { requireAuth } from '@@components/auth/auth';

type TrainingsProps = {};

const Trainings: React.FC<TrainingsProps> = () => {
  return (
    <div>
      <PageHeader title="Nächste Trainings" />
      <TrainingsList trainings={[]} />
    </div>
  );
};

export default requireAuth(Trainings);

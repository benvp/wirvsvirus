import React from 'react';
import { TrainingCard } from '@@/containers/trainings/TrainingCard';
import { requireAuth } from '@@components/auth/auth';
import DisableSSR from '@@components/utils/DisableSSR';

type TrainingPageProps = {};

const TrainingPage: React.FC<TrainingPageProps> = () => {
  return (
    <DisableSSR>
      <TrainingCard />
    </DisableSSR>
  );
};

export default requireAuth(TrainingPage);

import React from 'react';
import { TrainingsList } from '../containers/trainings/TrainingsList';
import { PageHeader } from '@@components/PageHeader/PageHeader';
import { requireAuth } from '@@components/auth/auth';
import { useQuery } from 'react-query';
import { Training } from '@@/types/globalTypes';
import { API_ROUTES, useFetch } from '@@modules/api/api';
import { BulletList } from 'react-content-loader';
import { PagedResult } from '@@modules/api/types';

type TrainingsProps = {};

const Trainings: React.FC<TrainingsProps> = () => {
  const fetch = useFetch();
  const { data, status } = useQuery<PagedResult<Training>, any>('trainings', () =>
    fetch(API_ROUTES.TRAININGS).then(res => res.json()),
  );

  return (
    <div>
      <PageHeader title="Nächste Trainings" />
      {status === 'loading' ? (
        <BulletList foregroundColor="#e2e8f0" backgroundColor="#edf2f7" width="50%" />
      ) : (
        <TrainingsList trainings={data?.items ?? []} />
      )}
    </div>
  );
};

export default requireAuth(Trainings);

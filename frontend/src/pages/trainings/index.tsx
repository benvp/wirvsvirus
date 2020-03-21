import React from 'react';
import { TrainingsList } from '../../containers/trainings/TrainingsList';
import { PageHeader } from '@@components/PageHeader/PageHeader';
import { requireAuth } from '@@components/auth/auth';
import { useQuery } from 'react-query';
import { Training } from '@@/types/globalTypes';
import { useFetch, apiRoutes } from '@@modules/api/api';
import { BulletList } from 'react-content-loader';
import { PagedResult } from '@@modules/api/types';
import Link from 'next/link';
import { ROUTES } from '@@modules/routes';
import { useCurrentUser } from '@@/context/AuthContext';

type TrainingsProps = {};

const Trainings: React.FC<TrainingsProps> = () => {
  const fetch = useFetch();
  const user = useCurrentUser();

  const { data, status } = useQuery<PagedResult<Training>, any>('trainings', () =>
    fetch(apiRoutes.trainings).then(res => res.json()),
  );

  const myTrainings = data?.items.filter(t => t.attendees.find(a => a.id === user?.id)) ?? [];

  const ActionButtons = (
    <span className="ml-3 shadow-sm rounded-md">
      <Link href={ROUTES.TRAININGS_NEW}>
        <a
          href=""
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
        >
          <svg
            className="fill-current w-6 h-6 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              className="heroicon-ui"
              d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
            />
          </svg>
          Training planen
        </a>
      </Link>
    </span>
  );

  return (
    <div>
      {user && (
        <div>
          <PageHeader title="Meine nächsten Trainings" rightContent={ActionButtons} />
          {status === 'loading' ? (
            <BulletList foregroundColor="#e2e8f0" backgroundColor="#edf2f7" width="50%" />
          ) : (
            <TrainingsList trainings={myTrainings} />
          )}
          <div className="mt-20" />
        </div>
      )}
      <PageHeader title="Offene Trainings" rightContent={user && ActionButtons} />
      {status === 'loading' ? (
        <BulletList foregroundColor="#e2e8f0" backgroundColor="#edf2f7" width="50%" />
      ) : (
        <TrainingsList trainings={data?.items ?? []} />
      )}
    </div>
  );
};

export default Trainings;

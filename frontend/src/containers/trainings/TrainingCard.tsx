import React, { useEffect } from 'react';
import { Training } from '@@/types/globalTypes';
import { useFetch, apiRoutes } from '@@modules/api/api';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { List as Loading } from 'react-content-loader';
import { Tag } from '@@components/core/Tag';
import { format } from 'date-fns';
import { Button } from '@@components/Button/Button';

type TrainingCardProps = {};

export const TrainingCard: React.FC<TrainingCardProps> = () => {
  const router = useRouter();
  const fetch = useFetch();

  const trainingId = parseInt((router.query as any).id, 10);
  const url = apiRoutes.training(trainingId);

  const { data: training, status } = useQuery<Training, any>('training', () =>
    fetch(url).then(res => res.json()),
  );

  return (
    <div className="bg-white shadow overflow-hidden  sm:rounded-lg">
      {status === 'loading' || !training ? (
        <div className="p-8">
          <Loading width="50%" />
        </div>
      ) : (
        <div>
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">{training.name}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                {training.tags?.map((t, idx) => (
                  <Tag key={t.id} className={idx > 0 ? 'ml-4' : undefined}>
                    {t.name}
                  </Tag>
                ))}
              </p>
            </div>
            <div className="flex align-middle justify-center">
              <p className="self-center text-gray-600 text-sm">
                <strong>44</strong> Teilnehmer
              </p>
              <Button className="ml-3">
                <svg
                  className="fill-current w-6 h-6 mr-2 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M17.62 10H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5c-1.2 0-2.3-.72-2.74-1.79l-3.5-7-.03-.06A3 3 0 0 1 5 9h5V4c0-1.1.9-2 2-2h1.62l4 8zM16 11.24L12.38 4H12v7H5a1 1 0 0 0-.93 1.36l3.5 7.02a1 1 0 0 0 .93.62H16v-8.76zm2 .76v8h2v-8h-2z"
                  />
                </svg>
                <span>Ich bin dabei!</span>
              </Button>
            </div>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm leading-5 font-medium text-gray-500">Leiter</dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900">
                  {training.host?.displayName}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm leading-5 font-medium text-gray-500">Datum</dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 font-semibold">
                  {format(new Date(training.date), 'Pp')}
                </dd>
              </div>
              {training.videoLink && (
                <div className="sm:col-span-1">
                  <dt className="text-sm leading-5 font-medium text-gray-500">Training Video</dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900">
                    <a
                      className="text-indigo-800 hover:text-indigo-600 font-semibold"
                      href={training.videoLink}
                    >
                      Hier anschauen
                    </a>
                  </dd>
                </div>
              )}
              <div className="sm:col-span-2">
                <dt className="text-sm leading-5 font-medium text-gray-500">Beschreibung</dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900">{training.description}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

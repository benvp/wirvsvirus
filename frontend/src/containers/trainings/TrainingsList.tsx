import React from 'react';
import { Training } from '../../types/globalTypes';
import { Pagination } from '../../components/Pagination/Pagination';
import { Tag } from '@@components/core/Tag';
import { format } from 'date-fns';
import Link from 'next/link';
import { apiRoutes } from '@@modules/api/api';
import { DYNAMIC_ROUTES, ROUTES } from '@@modules/routes';

type ListRowProps = {
  className?: string;
  training: Training;
};

export const ListRow: React.FC<ListRowProps> = ({ className, training }) => {
  return (
    <li className={className}>
      <Link href={DYNAMIC_ROUTES.TRAINING} as={ROUTES.training(training.id)}>
        <a
          href="#"
          className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
        >
          <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="flex align-middle">
                  <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                    {training.name}
                    <span className="ml-1 font-normal text-gray-500">
                      von {training?.host?.displayName}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex">
                  {training.tags?.map((t, idx) => (
                    <Tag key={t.id} className={idx > 0 ? 'ml-2' : undefined}>
                      {t.text}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex-shrink-0 sm:mt-0">
                <div className="">
                  <div className="flex justify-end">
                    {training.professional && (
                      <div className="flex-shrink-0 flex justify-end mr-2 mb-2">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          PRO
                        </span>
                      </div>
                    )}
                    <div className="flex mb-2 align-middle">
                      <span className="self-center">
                        <svg
                          className="h-4 w-4 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="24"
                          height="24"
                        >
                          <path
                            className="heroicon-ui"
                            d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                          />
                        </svg>
                      </span>
                      <span className="ml-1 self-center text-gray-600 text-sm">
                        <strong>{training.attendees.length}</strong> Teilnehmer
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm leading-5 text-gray-500">
                    <span>
                      <time dateTime="2020-01-07">{format(new Date(training.date), 'PPPPp')}</time>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 flex-shrink-0">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

type TrainingsTableProps = {
  trainings: Training[];
};

export const TrainingsList: React.FC<TrainingsTableProps> = ({ trainings }) => {
  return (
    <div>
      {trainings.length === 0 ? (
        <div className="flex justify-center align-middle text-gray-600 font-medium">
          Keine Trainings vorhanden.
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul>
            {trainings.map((t, idx) => (
              <ListRow
                key={t.id}
                training={t}
                className={idx > 0 ? 'border-t border-gray-200' : undefined}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

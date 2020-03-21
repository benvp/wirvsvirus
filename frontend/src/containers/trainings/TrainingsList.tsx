import React from 'react';
import { Training } from '../../types/globalTypes';
import { Pagination } from '../../components/Pagination/Pagination';
import { Tag } from '@@components/core/Tag';
import { format } from 'date-fns';

type ListRowProps = {
  className?: string;
  training: Training;
};

export const ListRow: React.FC<ListRowProps> = ({ className, training }) => {
  return (
    <li className={className}>
      <a
        href="#"
        className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
      >
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                Training
                <span className="ml-1 font-normal text-gray-500">
                  von {training.user.displayName}
                </span>
              </div>
              <div className="mt-2 flex">
                {training.tags.map((t, idx) => (
                  <Tag key={t.id} className={idx > 0 ? 'ml-2' : undefined}>
                    {t.name}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="mt-4 flex-shrink-0 sm:mt-0">
              <div className="flex">
                <div className="flex items-center text-sm leading-5 text-gray-500">
                  <span>
                    <time dateTime="2020-01-07">{format(new Date(training.date), 'Pp')}</time>
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

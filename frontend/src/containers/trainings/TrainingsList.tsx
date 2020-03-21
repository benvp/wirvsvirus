import React from 'react';
import { Training } from '../../types/globalTypes';
import { Pagination } from '../../components/Pagination/Pagination';

type ListRowProps = {
  className?: string;
  training: Training;
};

export const ListRow: React.FC<ListRowProps> = ({ className }) => {
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
                <span className="ml-1 font-normal text-gray-500">von Maro Rudolf</span>
              </div>
              <div className="mt-2 flex">
                <div className="flex-shrink-0 flex">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Beginner
                  </span>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Yoga
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex-shrink-0 sm:mt-0">
              <div className="flex">
                <div className="flex items-center text-sm leading-5 text-gray-500">
                  <span>
                    <time dateTime="2020-01-07">January 7, 2020 - 13:00</time>
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

export const TrainingsList: React.FC<TrainingsTableProps> = () => {
  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          <ListRow training={{}} />
          <ListRow training={{}} className="border-t border-gray-200" />
          <ListRow training={{}} className="border-t border-gray-200" />
          <ListRow training={{}} className="border-t border-gray-200" />
        </ul>
      </div>
      <div className="px-4">
        <Pagination />
      </div>
    </div>
  );
};

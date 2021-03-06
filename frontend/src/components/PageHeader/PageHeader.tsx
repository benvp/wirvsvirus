import React from 'react';

type PageHeaderProps = {
  title?: string;
  rightContent?: React.ReactNode;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, rightContent }) => {
  return (
    <div className="mb-10 md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
          {title}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        {rightContent}
        {/* <span className="shadow-sm rounded-md">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
          >
            Edit
          </button>
        </span> */}
      </div>
    </div>
  );
};

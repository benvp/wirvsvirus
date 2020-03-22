import React from 'react';
import { Training } from '@@/types/globalTypes';
import { Button } from '@@components/Button/Button';
import { getProfilePicture } from '@@modules/user/utils';

type SupportCardProps = {
  training: Training;
};

export const SupportCard: React.FC<SupportCardProps> = ({ training }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-center object-cover"
                  src={getProfilePicture(training.host)}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {training.host.displayName}
                </h3>
                {/* <p className="text-sm leading-5 text-gray-500">
                <a href="#">Unterstütze mich.</a>
              </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-4 pb-5 pt-0 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              <div>
                <label
                  htmlFor="about"
                  className="block mb-2 text-xs font-medium leading-5 text-gray-700 sm:mt-px tracking-wide uppercase"
                >
                  Über {training.host.displayName}
                </label>
                <p className="text-sm leading-7 text-gray-500">{training.host.about}</p>
                {/* <p className="text-sm leading-5 text-gray-500">
                <a href="#">Unterstütze mich.</a>
              </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 my-6 ">
        <blockquote className="md:flex-grow md:flex md:flex-col">
          <div className="relative text-sm leading-7 text-gray-500 md:flex-grow">
            <svg
              className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-indigo-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="relative">
              Wenn dir mein Training gefallen hat, wäre es wirklich super, wenn du mich mit einer
              Einzelspende unterstützen würdest. 😊🙏
            </p>
          </div>
        </blockquote>
      </div>
      <div className="px-6 my-8">
        <p className="uppercase tracking-wider text-xs text-gray-500 font-semibold">
          Empfohlener Spende pro Training
        </p>
        <p className="mt-1 uppercase tracking-wider text-2xl text-gray-000 font-semibold">
          € {training.recommendedDonation?.toFixed(0)}
        </p>

        {training.host.donationLink && (
          <Button className="mt-4">
            <a href={training.host.donationLink} target="_blank">
              Unterstützer werden
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

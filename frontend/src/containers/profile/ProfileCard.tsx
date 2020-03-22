import React from 'react';
import { useCurrentUser } from '@@/context/AuthContext';
import { getProfilePicture } from '@@modules/user/utils';

type ProfileCardProps = {};

export const ProfileCard: React.FC<ProfileCardProps> = () => {
  const user = useCurrentUser();

  return (
    <div>
      <div className="mt-4 p-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div>
          <div>
            <div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px"
                  >
                    Name <span className="text-red-700">*</span>
                  </label>
                </div>
                <div className="flex align-middle">
                  {user && (
                    <img
                      src={getProfilePicture(user)}
                      className="w-12 h-12 mr-4 object-center object-cover"
                    />
                  )}
                  <p className="mt-2 text-sm text-gray-500 self-center">{user?.displayName}</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px"
                  >
                    Benutzername <span className="text-red-700">*</span>
                  </label>
                </div>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <p className="mt-2 text-sm text-gray-500">{user?.username}</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px"
                >
                  Über dich <span className="text-red-700">*</span>
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <p className="mt-2 text-sm text-gray-500">{user?.about}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

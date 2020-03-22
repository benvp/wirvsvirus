import React, { useState } from 'react';
import { useCurrentUser, useAuthInfo } from '@@/context/AuthContext';
import { useFetch, apiRoutes } from '@@modules/api/api';
import { useFormik } from 'formik';
import { Button } from '@@components/Button/Button';
import Link from 'next/link';
import { ROUTES } from '@@modules/routes';
import { PageHeader } from '@@components/PageHeader/PageHeader';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { getProfilePicture } from '@@modules/user/utils';

type EditProfileCardProps = {};

export const EditProfileCard: React.FC<EditProfileCardProps> = () => {
  const { auth, setAuth } = useAuthInfo();
  const user = useCurrentUser();
  const fetch = useFetch();
  const [photo, setPhoto] = useState<File | null>(null);

  const [uploadPicture] = useMutation((photo: File) => {
    const formData = new FormData();
    formData.append('file', photo);

    return fetch(apiRoutes.profilePictureUpload, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    }).then(res => res.json());
  });

  const [saveProfile] = useMutation((values: any) =>
    fetch(apiRoutes.profile(user!.id), {
      method: 'PATCH',
      body: JSON.stringify(values),
    }).then(res => res.json()),
  );

  const formik = useFormik({
    initialValues: {
      name: user?.displayName,
      email: user?.username,
      about: user?.about,
      donationLink: user?.donationLink,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3)
        .required(),
      email: Yup.string().required(),
      about: Yup.string().required(),
      donationLink: Yup.string()
        .url()
        .required(),
    }),
    onSubmit: values => {
      if (photo) {
        return uploadPicture(photo).then(() =>
          saveProfile({
            displayName: values.name,
            username: values.email,
            about: values.about,
            donationLink: values.donationLink,
          }).then(u => {
            if (auth) {
              setAuth({ ...auth, user: u });
              location.reload();
            }
          }),
        );
      } else {
        return saveProfile({
          displayName: values.name,
          username: values.email,
          about: values.about,
          donationLink: values.donationLink,
        }).then(u => {
          if (auth) {
            setAuth({ ...auth, user: u });
          }
        });
      }
    },
  });

  return (
    <div>
      <div className="mt-4 p-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={formik.handleSubmit}>
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
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                      Dieser Name wird anderen angezeigt.
                    </p>
                  </div>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-xs rounded-md shadow-sm">
                      <input
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        required
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
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
                    <div className="max-w-xs rounded-md shadow-sm">
                      <input
                        id="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
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
                    <div className="max-w-lg flex rounded-md shadow-sm">
                      <textarea
                        id="about"
                        rows={3}
                        onChange={formik.handleChange}
                        value={formik.values.about}
                        className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Erzähle etwas über dich.</p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="profile-picture"
                    className="block text-sm leading-5 font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Foto
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    {user && (
                      <img
                        src={getProfilePicture(user)}
                        className="w-16 h-16 mb-4 object-center object-cover"
                      />
                    )}
                    <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600 self-center pl-14">
                          <input
                            id="profile-picture"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={e => setPhoto(e.target.files ? e.target.files[0] : null)}
                          />
                        </p>
                        <p className="mt-1 text-xs text-gray-500">PNG, JPG</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <div>
                    <label
                      htmlFor="donationLink"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px"
                    >
                      Spendenlink
                    </label>
                  </div>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-xs rounded-md shadow-sm">
                      <input
                        id="donationLink"
                        onChange={formik.handleChange}
                        value={formik.values.donationLink}
                        placeholder={`https://paypal.me/${user?.displayName}`}
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 max-w-lg">
                      Trage hier einen Link ein, welcher bei deinen professionellen Trainings für
                      spenden verwendet werden kann. (z.B.{' '}
                      <a
                        href="https://www.paypal.com/de/webapps/mpp/paypal-me"
                        target="_blank"
                        className="hover:text-black underline"
                      >
                        paypal.me
                      </a>{' '}
                      Link).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-5">
              <div className="flex justify-end">
                <span className="inline-flex rounded-md shadow-sm">
                  <Link href={ROUTES.TRAININGS}>
                    <a
                      type="button"
                      className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >
                      Abbrechen
                    </a>
                  </Link>
                </span>
                <span className="ml-3 inline-flex rounded-md shadow-sm">
                  <Button disabled={!formik.isValid || formik.isSubmitting} type="submit">
                    Speichern
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

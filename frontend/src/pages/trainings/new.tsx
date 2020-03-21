import React from 'react';
import { PageHeader } from '@@components/PageHeader/PageHeader';
import Link from 'next/link';
import { ROUTES } from '@@modules/routes';
import { useFormik, useField } from 'formik';
import * as Yup from 'yup';
import { Button } from '@@components/Button/Button';
import DatePicker from 'react-datepicker';

type NewTrainingPageProps = {};

export const NewTrainingPage: React.FC<NewTrainingPageProps> = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      date: '',
      tags: '',
      professional: false,
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      name: Yup.string().required(),
      date: Yup.date().required(),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <div>
      <PageHeader title="Neues Training planen" />
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
                      Name
                    </label>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                      Gib deinem Training einen Namen.
                    </p>
                  </div>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-xs rounded-md shadow-sm">
                      <input
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px"
                  >
                    Beschreibung
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                      <textarea
                        id="description"
                        rows={3}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Erzähle etwas über das geplante Training.
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px"
                    >
                      Datum
                    </label>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                      Wann soll das Training stattfinden?
                    </p>
                  </div>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-xs rounded-md shadow-sm">
                      <DatePicker
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={d => formik.setFieldValue('date', d ?? '')}
                        showTimeInput
                        selected={formik.values.date ? new Date(formik.values.date) : new Date()}
                        dateFormat="Pp"
                      />
                      {/* <input
                        id="date"
                        onChange={formik.handleChange}
                        value={formik.values.date}
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px"
                    >
                      Tags
                    </label>
                  </div>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-xs rounded-md shadow-sm">
                      <input
                        id="tags"
                        onChange={formik.handleChange}
                        value={formik.values.tags}
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                <div className="m-t6 sm:mt-5 sm:border-t sm:border-gray-200 sm:pt-5 sm:border-t sm:border-gray-200">
                  <fieldset>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                      <div>
                        <legend className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700">
                          Sonstiges
                        </legend>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg">
                          <div className="relative flex items-start">
                            <div className="absolute flex items-center h-5">
                              <input
                                id="comments"
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                onChange={e =>
                                  formik.setFieldValue('professional', e.target.checked)
                                }
                                checked={formik.values.professional}
                              />
                            </div>
                            <div className="pl-7 text-sm leading-5">
                              <label htmlFor="comments" className="font-medium text-gray-700">
                                Professionelles Training
                              </label>
                              <p className="text-gray-500">
                                Du bist professioneller Trainer und gibst ein geführtes Training.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
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
                  Erstellen
                </Button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTrainingPage;

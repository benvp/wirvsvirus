import React, { useState } from 'react';
import { PageHeader } from '@@components/PageHeader/PageHeader';
import Link from 'next/link';
import { ROUTES } from '@@modules/routes';
import { useFormik, useField } from 'formik';
import * as Yup from 'yup';
import { Button } from '@@components/Button/Button';
import DatePicker from 'react-datepicker';
import { useFetch, apiRoutes } from '@@modules/api/api';
import { useQuery, useMutation } from 'react-query';
import { Tag } from '@@/types/globalTypes';
import ReactTags, { Tag as AutocompleteTag } from 'react-tag-autocomplete';
import { useRouter } from 'next/router';

type NewTrainingPageProps = {};

export const NewTrainingPage: React.FC<NewTrainingPageProps> = () => {
  const fetch = useFetch();
  const router = useRouter();

  const [suggestions, setSuggestions] = useState<Tag[]>([]);

  const { data: tags = [] } = useQuery<Tag[], any>('tags', () =>
    fetch(apiRoutes.tags).then(res => res.json()),
  );

  const [createTraining] = useMutation((values: any) =>
    fetch(apiRoutes.trainings, { method: 'POST', body: JSON.stringify(values) }).then(res =>
      res.json(),
    ),
  );

  const convertTag = (tag: Tag): AutocompleteTag => ({
    id: tag.id,
    name: tag.text,
  });

  const filterSuggestions = (query: string) => {
    const filtered = tags.filter(x => x.text.toLowerCase().startsWith(query.toLowerCase()));

    setSuggestions(filtered);

    return filtered.map(convertTag);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      date: new Date(),
      tags: [] as Tag[],
      professional: false,
      recommendedDonation: '0',
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
    }),
    onSubmit: values => {
      const dto = {
        name: values.name,
        description: values.description,
        date: values.date,
        professional: values.professional,
        tagIDs: values.tags.map(x => x.id),
        recommendedDonation: values.recommendedDonation,
      };

      return createTraining(dto).then(() => router.push(ROUTES.TRAININGS));
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
                      Name <span className="text-red-700">*</span>
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
                        required
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
                    Beschreibung <span className="text-red-700">*</span>
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
                      Datum <span className="text-red-700">*</span>
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
                      <ReactTags
                        minQueryLength={1}
                        tags={formik.values.tags.map(convertTag)}
                        suggestions={suggestions.map(convertTag)}
                        handleInputChange={filterSuggestions}
                        handleDelete={idx => {
                          formik.setFieldValue('tags', [
                            ...formik.values.tags.slice(0, idx),
                            ...formik.values.tags.slice(idx + 1),
                          ]);
                        }}
                        handleAddition={t => {
                          formik.setFieldValue('tags', [
                            ...formik.values.tags,
                            { id: t.id, text: t.name },
                          ]);
                        }}
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
                          <div className="mt-8 md:pl-7">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px"
                              >
                                Empfohlene Spende
                              </label>
                              <p className="mt-2 max-w-2xl text-sm leading-5 text-gray-500">
                                Hier kannst du eine empfohlene Spende für diese Trainingseinheit
                                eintragen.
                              </p>
                              <span className="text-xs text-gray-400">
                                (nur für professionell geführte Trainings)
                              </span>
                            </div>
                            <div className="sm:mt-2 sm:col-span-2">
                              <div className="flex">
                                <div className="max-w-xs rounded-md shadow-sm">
                                  <input
                                    disabled={!formik.values.professional}
                                    id="recommendedDonation"
                                    type="number"
                                    min="0"
                                    max="9999"
                                    onChange={formik.handleChange}
                                    value={formik.values.recommendedDonation}
                                    required
                                    className={
                                      formik.values.professional
                                        ? 'form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                                        : 'form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-gray-300 cursor-not-allowed'
                                    }
                                  />
                                </div>
                                <p className="text-xl text-gray-700 ml-2 self-center">€</p>
                              </div>
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

import React, { useState } from 'react';
import { Training } from '@@/types/globalTypes';
import { useFetch, apiRoutes } from '@@modules/api/api';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { List as Loading } from 'react-content-loader';
import { Tag } from '@@components/core/Tag';
import { format } from 'date-fns';
import { Button } from '@@components/Button/Button';
import { useCurrentUser } from '@@/context/AuthContext';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ROUTES } from '@@modules/routes';

type TrainingCardProps = {
  training: Training;
  onAttend?: () => Promise<any>;
  isAttendLoading?: boolean;
};

export const TrainingCard: React.FC<TrainingCardProps> = ({
  training,
  onAttend = () => {},
  isAttendLoading = false,
}) => {
  const router = useRouter();
  const fetch = useFetch();
  const user = useCurrentUser();

  const [copied, setCopied] = useState(false);

  const isAttendee = training && !!training.attendees.find(x => x.id === user?.id);
  const isOwner = training && training.host.id === user?.id;

  const [deleteTraining, { status: deleteStatus }] = useMutation(() =>
    fetch(apiRoutes.training(training.id), { method: 'DELETE' }),
  );

  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {status === 'loading' || !training ? (
          <div className="p-8">
            <Loading width="50%" />
          </div>
        ) : (
          <div>
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
              <div>
                <h3 className="ml-2 mb-2 text-lg leading-6 font-medium text-gray-900">
                  {training.name}
                </h3>
                <div className="flex mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                  {training.tags?.map((t, idx) => (
                    <Tag key={t.id} className={idx > 0 ? 'ml-2' : undefined}>
                      {t.text}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="flex align-middle justify-center">
                <p className="self-center text-gray-600 text-sm">
                  <strong>{training.attendees.length}</strong> Teilnehmer
                </p>
                <Button className="ml-3" onClick={() => onAttend()} disabled={isAttendLoading}>
                  {isAttendee ? (
                    <svg
                      className="fill-current w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        className="heroicon-ui"
                        d="M6.38 14H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h11.5c1.2 0 2.3.72 2.74 1.79l3.5 7 .03.06A3 3 0 0 1 19 15h-5v5a2 2 0 0 1-2 2h-1.62l-4-8zM8 12.76L11.62 20H12v-7h7c.13 0 .25-.02.38-.08a1 1 0 0 0 .55-1.28l-3.5-7.02A1 1 0 0 0 15.5 4H8v8.76zM6 12V4H4v8h2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="fill-current w-6 h-6 mr-2"
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
                  )}
                  <span>{isAttendee ? 'Absagen' : 'Ich bin dabei!'}</span>
                </Button>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-2">
                <div className="sm:col-span-2 -mb-4">
                  {training.professional && (
                    <div className="flex-shrink-0 flex justify-start mb-2">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        PRO
                      </span>

                      <dd className="ml-2 text-sm leading-5 text-gray-600">
                        Dies ist ein professionell geführtes Training.
                      </dd>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm leading-5 font-medium text-gray-500">Leiter</dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900">
                    {training.host?.displayName}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm leading-5 font-medium text-gray-500">Datum</dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 font-semibold">
                    {training?.date && format(new Date(training.date), 'Pp')}
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
      <div className="mt-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Training beginnen</h3>
            <a
              href={training?.conferenceLink}
              target="_blank"
              type="button"
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 sm:w-auto sm:text-sm sm:leading-5"
            >
              {isOwner ? 'Training jetzt starten' : 'Jetzt teilnehmen'}
            </a>

            {isOwner && (
              <div>
                <div className="mt-8 max-w-xl text-sm leading-5 text-gray-500">
                  <p>oder teile diesen Link um weitere Teilnehmer einzuladen.</p>
                </div>
                <div className="mt-5 sm:flex sm:items-center">
                  <div className="max-w-xs w-full">
                    <div className="relative rounded-md shadow-sm">
                      <input
                        id="conference-link"
                        disabled
                        className="form-input block w-full sm:text-sm sm:leading-5 text-gray-500"
                        value={training?.conferenceLink}
                      />
                    </div>
                  </div>
                  <span className="mt-3 inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto">
                    <CopyToClipboard
                      text={training?.conferenceLink ?? ''}
                      onCopy={() => setCopied(true)}
                    >
                      <button
                        disabled={copied}
                        type="button"
                        className={
                          copied
                            ? 'py-2 px-4 border border-gray-200 rounded-md text-sm leading-5 font-medium text-gray-400 cursor-not-allowed'
                            : 'py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out'
                        }
                      >
                        {copied ? 'In Zwischenablage kopiert' : 'Kopieren'}
                      </button>
                    </CopyToClipboard>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOwner && (
        <div className="flex justify-end px-2 mt-4">
          <a
            className="text-gray-400 text-sm font-semibold hover:text-red-400"
            onClick={() =>
              confirm(
                'Möchtest du dieses Training wirklich löschen? Du kannst diese Aktion nicht rückgängig machen.',
              ) && deleteTraining().then(() => router.push(ROUTES.TRAININGS))
            }
            href="#"
          >
            Training löschen
          </a>
        </div>
      )}
    </div>
  );
};

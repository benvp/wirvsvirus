import React from 'react';
import { TrainingCard } from '@@/containers/trainings/TrainingCard';
import { requireAuth } from '@@components/auth/auth';
import DisableSSR from '@@components/utils/DisableSSR';
import { SupportCard } from '@@/containers/trainings/SupportCard';
import { apiRoutes, useFetch } from '@@modules/api/api';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
import { Training } from '@@/types/globalTypes';
import { List as Loading } from 'react-content-loader';
import { useCurrentUser } from '@@/context/AuthContext';

type TrainingPageProps = {};

const TrainingPage: React.FC<TrainingPageProps> = () => {
  const router = useRouter();
  const fetch = useFetch();
  const user = useCurrentUser();

  const trainingId = parseInt((router.query as any).id, 10);
  const url = apiRoutes.training(trainingId);

  const { data: training, status, refetch } = useQuery<Training, any>('training', () =>
    fetch(url).then(res => res.json()),
  );

  const [attend, { status: attendStatus }] = useMutation(() =>
    fetch(apiRoutes.trainingAttend(trainingId), {
      method: isAttendee ? 'DELETE' : 'POST',
    }).then(res => res.json()),
  );

  const isAttendee = training && !!training.attendees.find(x => x.id === user?.id);

  return (
    <DisableSSR>
      <div className="grid grid-cols-12 gap-6">
        {status === 'loading' || !training ? (
          <div className="p-8">
            <Loading width="50%" />
          </div>
        ) : (
          <React.Fragment>
            <div className="col-span-8">
              <TrainingCard
                training={training}
                onAttend={() => attend().then(refetch)}
                isAttendLoading={attendStatus === 'loading'}
              />
            </div>
            <div className="col-span-4">
              <SupportCard training={training} />
            </div>
          </React.Fragment>
        )}
      </div>
    </DisableSSR>
  );
};

export default requireAuth(TrainingPage);

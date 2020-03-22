import React from 'react';
import { requireAuth } from '@@components/auth/auth';
import DisableSSR from '@@components/utils/DisableSSR';
import { ProfileCard } from '@@/containers/profile/ProfileCard';
import { EditProfileCard } from '@@/containers/profile/EditProfileCard';
import { PageHeader } from '@@components/PageHeader/PageHeader';
import { useRouter } from 'next/router';
import { useCurrentUser } from '@@/context/AuthContext';

type ProfilePageProps = {};

export const ProfilePage: React.FC<ProfilePageProps> = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const isOwner = (router.query as any).id === user?.id;

  return (
    <DisableSSR>
      <PageHeader title={isOwner ? 'Dein Profil' : 'Profil'} />
      {isOwner ? <EditProfileCard /> : <ProfileCard />}
    </DisableSSR>
  );
};

export default requireAuth(ProfilePage);

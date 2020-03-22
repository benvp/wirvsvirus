import { User } from '@@/types/globalTypes';

const PLACEHOLDER_REGEX = /^placeholder_(\d)$/;

export const getProfilePicture = (user: User) => {
  // temporary workaround to map placeholder picture urls
  const isPlaceholder = PLACEHOLDER_REGEX.test(user.profilePicture);
  const match = user.profilePicture.match(PLACEHOLDER_REGEX);
  const placeholderId = match?.length ? match[1] : user.profilePicture;

  return isPlaceholder && placeholderId
    ? `/img/avatar/profile_${placeholderId}.png`
    : user.profilePicture;
};

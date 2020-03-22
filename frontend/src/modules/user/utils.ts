import { User } from '@@/types/globalTypes';
import { API_BASE_URL } from '@@modules/api/api';

const PLACEHOLDER_REGEX = /^placeholder_(\d)$/;

export const getProfilePicture = (user: User) => {
  // temporary workaround to map placeholder picture urls
  const isPlaceholder = user.profilePicture
    ? false
    : PLACEHOLDER_REGEX.test(user.profilePicturePlaceholder);

  const match = user.profilePicturePlaceholder.match(PLACEHOLDER_REGEX);
  const placeholderId = match?.length ? match[1] : user.profilePicture;

  return isPlaceholder && placeholderId
    ? `/img/avatar/profile_${placeholderId}.png`
    : `${API_BASE_URL}/users/${user.id}/picture`;
};

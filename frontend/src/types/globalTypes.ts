export interface Training {
  id: number;
  name: string;
  description: string;
  date: string;
  createdDate: string;
  videoLink: string;
  host: User;
  tags: Tag[];
  professional: boolean;
  attendees: User[];
  conferenceLink: string;
  recommendedDonation: number;
}

export interface AuthInfo {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  displayName: string;
  username: string;
  role: Role;
  donationLink: string;
  profilePicturePlaceholder: string;
  profilePicture: UserProfilePicture;
  about: string;
}

export interface UserProfilePicture {
  id: string;
  filename: string;
}

export interface Tag {
  id: number;
  text: string;
}

export enum Role {
  Admin = 'admin',
}

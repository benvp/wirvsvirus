export interface Training {
  id: string;
  name: string;
  description: string;
  date: string;
  createdDate: string;
  videoLink: string;
  user: User;
  tags: Tag[];
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
}

export interface Tag {
  id: string;
  name: string;
}

export enum Role {
  Admin = 'admin',
}

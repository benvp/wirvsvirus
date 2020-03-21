export interface Training {
  id: number;
  name: string;
  description: string;
  date: string;
  createdDate: string;
  videoLink: string;
  host: User;
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
  id: number;
  text: string;
}

export enum Role {
  Admin = 'admin',
}

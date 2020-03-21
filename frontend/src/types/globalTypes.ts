export interface Training {}

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

export enum Role {
  Admin = 'admin',
}

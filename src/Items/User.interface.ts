export interface BaseUser {
  name: string;
  name_user: string;
  email: string;
  direction: string;
  rol: number;
}

export interface User extends BaseUser {
  id: string;
  userId: string;
}

export interface Users {
  [key: number]: User;
}

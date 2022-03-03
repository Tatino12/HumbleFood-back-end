import { Shop } from "./Shop.interface";

export interface BaseUser {
  name: string;
  name_user: string;
  email: string;
  direction: string;
  rol: number;
}

export interface User extends BaseUser {
  id: string;
}

export interface Users {
  [key: number]: User;
}

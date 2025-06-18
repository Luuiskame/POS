import type { Product, User } from "./types";

export type loginData = {
  email: string;
  password: string;
};

export type userState = {
  users: User[];
  userLogin: User;
};

export type productState = {
  products: Product[];
} 





export type RootState = {
  user: userState;
  products: productState;
  // Agrega más propiedades si tienes otros reducers
};
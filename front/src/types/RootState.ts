import type { CartItem, Product, User } from "./types";

export type loginData = {
  email: string;
  password: string;
};

export type userState = {
  users: User[];
  userLogin: User;
  isHydrated: boolean;
};

export type productState = {
  products: Product[];
} 

export type cartState = {
  cartItems: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
};



export type RootState = {
  user: userState;
  products: productState;
  cart: cartState;
  // Agrega más propiedades si tienes otros reducers
};
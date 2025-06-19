import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { users } from "@/lib/data";
import type { User } from "@/types/types";
import type { RootState } from "@/types/RootState";

interface UserState {
  users: User[];
  userLogin: User | null; // Añadir null como posibilidad
}

// Estado inicial correctamente tipado
const initialState: UserState = {
  users: [...users],
  userLogin: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    removeUser: (state, action: PayloadAction<{ id: string }>) => {
      const userId = action.payload.id;
      state.users = state.users.filter((user) => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    // getUsers eliminado porque los reducers no pueden retornar valores
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );

      if (user) {
        state.userLogin = user;
        localStorage.setItem("userLogin", JSON.stringify(user));
      } else {
        state.userLogin = null;
      }
    },
    logoutUser: (state) => {
      state.userLogin = null;
      localStorage.removeItem("userLogin");
    },
    setUserLogin: (state, action: PayloadAction<User>) => {
      state.userLogin = action.payload;
    },
  },
});

export const {
  setUsers,
  addUser,
  removeUser,
  login,
  logoutUser,
  setUserLogin,
} = userSlice.actions;

export default userSlice.reducer;

//selectores
export const selectAllUsers = (state: RootState) =>
  state.user?.users || state.user?.users || [];
export const selectUserById = (state: RootState, id: string) => {
  const users = state.user?.users || state.user?.users || [];
  return users.find((product) => product.id === id);
};
export const selectUserCount = (state: RootState) => {
  const users = state.user?.users || state.user?.users || [];
  return users.length;
}
export const selectUserLogin = (state: RootState) =>
  state.user?.userLogin || state.user?.userLogin || null;

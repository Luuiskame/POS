import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { users } from "@/lib/data";
import type { User } from "@/types/types";
import type { RootState } from "@/types/RootState";
import type { AppThunk } from "../store";

interface UserState {
  users: User[];
  userLogin: User | null; // Añadir null como posibilidad
  isHydrated: boolean; 
}

// Estado inicial correctamente tipado
const initialState: UserState = {
  users: [...users],
  userLogin: null,
  isHydrated: false, 

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
    user.isActive = true; // Marcar al usuario como activo
    // Crear un nuevo objeto sin la propiedad password
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem("userLogin", JSON.stringify(userWithoutPassword));
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
     hydrate: (state, action: PayloadAction<User | null>) => {
      state.userLogin = action.payload;
      state.isHydrated = true;
    },
  },
});


export const hydrateUser = (): AppThunk => (dispatch) => {
  const storedUser = localStorage.getItem("userLogin"); 
  if (storedUser) {
    dispatch(userSlice.actions.hydrate(JSON.parse(storedUser)));
  } else {
    dispatch(userSlice.actions.hydrate(null));
  }
};

export const {
  setUsers,
  addUser,
  removeUser,
  login,
  logoutUser,
  setUserLogin,
} = userSlice.actions;

export default userSlice.reducer;

// Selectores (actualizados)
export const selectAllUsers = (state: RootState) => state.user.users;
export const selectUserById = (state: RootState, id: string) => 
  state.user.users.find((user) => user.id === id);
export const selectUserCount = (state: RootState) => state.user.users.length;
export const selectUserLogin = (state: RootState) => state.user.userLogin;
export const selectIsHydrated = (state: RootState) => state.user.isHydrated;

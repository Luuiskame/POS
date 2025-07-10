// userSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { users } from "@/lib/data";
import type { User } from "@/types/types";
import type { RootState } from "@/types/RootState";
import type { AppThunk } from "../store";
import type { Stores } from "@/types/types";

interface UserState {
  users: User[];
  userLogin: User | null;
  isHydrated: boolean;
  tempUserData: User | null; // Agregar para manejar datos temporales
}

const initialState: UserState = {
  users: [...users],
  userLogin: null,
  isHydrated: false,
  tempUserData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<{ id: string }>) => {
      const userId = action.payload.id;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    logoutUser: (state) => {
      state.userLogin = null;
      state.tempUserData = null;
    },
    setActiveStore: (state, action: PayloadAction<Stores>) => {
      if (state.userLogin) {
        state.userLogin.activeStore = action.payload;
      }
    },
    setUserLogin: (state, action: PayloadAction<User>) => {
      state.userLogin = action.payload;
    },
    setTempUserData: (state, action: PayloadAction<User>) => {
      state.tempUserData = action.payload;
    },
    clearTempUserData: (state) => {
      state.tempUserData = null;
    },
    hydrate: (state, action: PayloadAction<{ userLogin: User | null; tempUserData: User | null }>) => {
      state.userLogin = action.payload.userLogin;
      state.tempUserData = action.payload.tempUserData;
      state.isHydrated = true;
    },
    persistUserData: (state) => {
      if (state.userLogin) {
        localStorage.setItem("userLogin", JSON.stringify(state.userLogin));
      }
      if (state.tempUserData) {
        localStorage.setItem("tempUserData", JSON.stringify(state.tempUserData));
      }
    },


   
    persistActiveStore: (state, action: PayloadAction<Stores>) => {
      localStorage.setItem("activeStore", JSON.stringify(action.payload));
    },


    
    clearPersistedData: () => {
      localStorage.removeItem("userLogin");
      localStorage.removeItem("tempUserData");
      localStorage.removeItem("activeStore");
    },
  },
});

// Thunks para manejar la lógica compleja
export const handleLoginSuccess =
  (userData: User): AppThunk =>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  (dispatch, getState) => {
    // Paso 1: Guardar datos temporales para selección de tienda
    const userWithActiveStore = {
      ...userData,
      activeStore: null,
    };
    
    dispatch(userSlice.actions.setTempUserData(userWithActiveStore));
    dispatch(userSlice.actions.persistUserData());

    // Paso 2: Verificar si necesita selección de tienda
    if (userData.userStores && userData.userStores.length > 1) {
      return { needsStoreSelection: true };
    }

    // Paso 3: Si solo tiene una tienda, establecerla automáticamente
    const activeStore = userData.userStores?.[0] || null;
    dispatch(userSlice.actions.setUserLogin(userWithActiveStore));
    
    if (activeStore) {
      dispatch(userSlice.actions.setActiveStore(activeStore));
      dispatch(userSlice.actions.persistActiveStore(activeStore));
    }
    
    dispatch(userSlice.actions.clearTempUserData());
    dispatch(userSlice.actions.persistUserData());
    
    return { needsStoreSelection: false };
  };

export const hydrateUser = (): AppThunk => (dispatch) => {
  const storedUser = localStorage.getItem("userLogin");
  const storedTempData = localStorage.getItem("tempUserData");
  
  dispatch(
    userSlice.actions.hydrate({
      userLogin: storedUser ? JSON.parse(storedUser) : null,
      tempUserData: storedTempData ? JSON.parse(storedTempData) : null,
    })
  );
};

export const completeLoginWithStore = (
  store: Stores,
  userWithStore: User
): AppThunk => (dispatch) => {
  // 1. Actualizar el store activo en el estado
  dispatch(userSlice.actions.setActiveStore(store));
  
  // 2. Actualizar el usuario en el estado
  dispatch(userSlice.actions.setUserLogin(userWithStore));
  
  // 3. Persistir los datos
  dispatch(userSlice.actions.persistActiveStore(store));
  dispatch(userSlice.actions.persistUserData());
  
  // 4. Limpiar datos temporales si existen
  dispatch(userSlice.actions.clearTempUserData());
  localStorage.removeItem("tempUserData");
};




  

export const {
  setUsers,
  addUser,
  removeUser,
  logoutUser,
  setUserLogin,
  setActiveStore,
  persistUserData,
  clearPersistedData,
  persistActiveStore
} = userSlice.actions;

export default userSlice.reducer;

// Selectores
export const selectAllUsers = (state: RootState) => state.user.users;
export const selectUserById = (state: RootState, id: string) =>
  state.user.users.find((user) => user.id === id);
export const selectUserCount = (state: RootState) => state.user.users.length;
export const selectUserLogin = (state: RootState) => state.user.userLogin;
export const selectIsHydrated = (state: RootState) => state.user.isHydrated;
export const selectTempUserData = (state: RootState) => state.user.tempUserData;
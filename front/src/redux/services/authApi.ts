import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { User } from "@/types/types";
import { logoutUser } from "../features/userSlice";
import { Mutex } from "async-mutex";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});



const mutex = new Mutex();

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  const status = (result.error as FetchBaseQueryError)?.status;

  if (result.error && [401, 403].includes(status as number)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("Intentando refrescar el token...");
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
          },
          api,
          extraOptions,
        );

        console.log("Resultado del refresh:", refreshResult);

        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
          console.log("Resultado después de refrescar:", result);
        } else {
          console.warn("No se pudo refrescar el token. Cerrando sesión.");
          api.dispatch(logoutUser());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;

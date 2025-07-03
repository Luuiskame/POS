import { User } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const backendUrl = import.meta.env.VITE_BACKEND_URL;

type UserApiResponse = User[];

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation<UserApiResponse, User>({
            query: (credentials: User) => {
                console.log("credentials", credentials);
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: credentials,
                };
            },
        }),
    }),
});

export const { useCreateUserMutation } = UserApi;
import { User } from "@/types/types";
import { createApi} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./authApi";





type UserApiResponse = {
    user: User;
    message: string;
};

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: baseQueryWithReauth,
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
import { createApi } from "@reduxjs/toolkit/query/react";
import { Stores } from "@/types/types";
import { baseQueryWithReauth } from "./authApi";



type StoreApiResponse = Stores[];

export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        createStores: builder.mutation<StoreApiResponse, Stores>({
            query: (credentials: Stores) => {
                console.log("credentials", credentials);
                return {
                    url: '/store/create-store',
                    method: 'POST',
                    body: credentials,
                };
            },
        }),
        setActiveStore: builder.mutation<{message: string}, {storeId: string, userId: string}>({
            query: ({storeId, userId}) => ({
                url: '/auth/set-active-store',
                method: 'POST',
                body: { storeId, userId },
            }),
        }),
    }),
});

export const { useCreateStoresMutation, useSetActiveStoreMutation } = storeApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Stores } from "@/types/types";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

type StoreApiResponse = Stores[];

export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl,
        credentials: 'include',
    }),
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
    }),
});

export const { useCreateStoresMutation } = storeApi;
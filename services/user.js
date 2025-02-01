import { fireBaseUrl } from '../config/fetchInfo';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["updateImageProfile", "updateLocation", "updateCart"],
    baseQuery: fetchBaseQuery({ baseUrl: fireBaseUrl }),
    endpoints: (builder) => ({
        patchImageProfile: builder.mutation({
            query: ({ localId, image }) => ({
                url: `users/${localId}.json`,
                method: "PATCH",
                body: { image },
            }),
            invalidatesTags: ["updateImageProfile"],
        }),
        patchLocation: builder.mutation({
            query: ({ localId, address, location }) => ({
                url: `users/${localId}.json`,
                method: "PATCH",
                body: { address, location },
            }),
            invalidatesTags: ["updateLocation"],
        }),
        patchCart: builder.mutation({
            query: ({ localId, cart }) => ({
                url: `users/${localId}.json`,
                method: "PATCH",
                body: { cart },
            }),
            invalidatesTags: ["updateCart"],
        }),
        getUser: builder.query({
            query: ({ localId }) => `users/${localId}.json`,
            providesTags: ["updateImageProfile", "updateLocation", "updateCart"],
        }),
        // Nuevo query para obtener solo el carrito
        getCart: builder.query({
            query: ({ localId }) => `users/${localId}/cart.json`, // Asegúrate de que la ruta sea correcta
            providesTags: ["updateCart"],
        }),
    }),
});

export const { 
    usePatchImageProfileMutation, 
    useGetUserQuery, 
    usePatchLocationMutation, 
    usePatchCartMutation,
    useGetCartQuery // Exportamos el hook para obtener solo el carrito
} = userApi;
//cartApi

import { fireBaseUrl } from '../config/fetchInfo';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: fireBaseUrl }),
  tagTypes: ['Cart'],  // Define 'Cart' as a tag type
  endpoints: (builder) => ({
    getCart: builder.query({
      query: ({ localId }) => `users/${localId}/cart.json`,
      providesTags: (result, error, { localId }) => [{ type: 'Cart', id: localId }], // Tag by localId
    }),
    patchCart: builder.mutation({
      query: ({ localId, cart }) => ({
        url: `users/${localId}/cart.json`,
        method: "PUT",  // "PUT" to replace the cart
        body: cart,
      }),
      invalidatesTags: (result, error, { localId }) => [{ type: 'Cart', id: localId }], // Invalidate by localId
    }),
  })
});

export const { useGetCartQuery, usePatchCartMutation } = cartApi;


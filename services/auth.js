import { 
    authBaseUrl,
    authApiKey,
  } from '../config/fetchInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: authBaseUrl }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (credentials) => ({
                url: `accounts:signUp?key=${authApiKey}`,
                method: "POST",
                body: credentials
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: `accounts:signInWithPassword?key=${authApiKey}`,
                method: "POST",
                body: credentials
            })
        }),
    })
})

export const { useSignUpMutation, useLoginMutation } = authApi
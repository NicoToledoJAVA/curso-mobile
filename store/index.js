import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import counterReducer from "../contexts/counterSlice";
import shopReducer from "../contexts/shopSlice";
import userReducer from "../contexts/userSlice";

import { shopApi } from '../services/shop';
import { authApi } from '../services/auth';
import { userApi } from '../services/user';
import { cartApi } from '../services/cart';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        user: userReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer, // ✅ Agregado cartApi
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            shopApi.middleware,
            authApi.middleware,
            userApi.middleware,
            cartApi.middleware // ✅ Agregado middleware del carrito
        )
});

setupListeners(store.dispatch);

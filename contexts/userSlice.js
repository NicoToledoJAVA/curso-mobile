//userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        idToken: "",
        localId: "",
        cart: []  // ⬅️ Agregar el carrito al estado inicial
    },
    reducers: {
        setUser: (state, action) => {            
            state.email = action.payload.email;
            state.idToken = action.payload.idToken;
            state.localId = action.payload.localId;
            state.cart = action.payload.cart || []; // ⬅️ Si no hay carrito, dejarlo vacío
        },
        updateCart: (state, action) => {
            state.cart = action.payload; // ⬅️ Actualiza el carrito en Redux
        },
        deleteUser: (state) => {           
            state.email = "";
            state.idToken = "";
            state.localId = "";
            state.cart = []; // ⬅️ Limpia el carrito cuando se cierra sesión
        }
    }
});

export const { setUser, updateCart, deleteUser } = userSlice.actions;

export default userSlice.reducer;


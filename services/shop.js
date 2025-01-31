import { fireBaseUrl } from '../config/fetchInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopApi = createApi({

    baseQuery: fetchBaseQuery({ baseUrl: fireBaseUrl }),
    endpoints: (builder) => ({
        getWines: builder.query({
            // Obtener todos los vinos
            query: () => "wines.json", // Endpoint para obtener todos los vinos
        }),
        // Obtener un vino por ID
        getWineById: builder.query({
            query: (id) => `wines/${id}.json`, // Endpoint para obtener un vino específico
        }),

    })

})

// Exportar los hooks generados automáticamente por RTK Query
export const { useGetWinesQuery, useGetWineByIdQuery } = shopApi;
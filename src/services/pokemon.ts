import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        getPokemonById: builder.query({
            query: (id) => `pokemon/${id}`
        }),
        patchPokemonById: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `pokemon/${id}`,
                method: 'PATCH',
                body: patch
            })
        })
    })
})

export const { useGetPokemonByIdQuery, usePatchPokemonByIdMutation } = pokemonApi

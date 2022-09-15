import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes'],
    endpoints: (builder) => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes'],
        }),
        createHero: builder.mutation({
            query: (hero) => ({
                url: '/heroes',
                method: 'post',
                body: hero,
            }),
            invalidatesTags: ['Heroes'],
        }),
    }),
});

export const {useGetHeroesQuery, useCreateHeroMutation} = apiSlice;
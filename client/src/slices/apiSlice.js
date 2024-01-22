import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const userBaseQuery  = fetchBaseQuery({ baseUrl: '' })

export const userApiSlice = createApi({
    baseQuery: userBaseQuery,
    tagtypes: ['User'],
    endpoints: (builder) => ({}),
});


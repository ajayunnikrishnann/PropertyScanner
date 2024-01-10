import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' })

export const userApiSlice = createApi({
    baseQuery,
    tagtypes: ['User'],
    endpoints: (builder) => ({}),
})
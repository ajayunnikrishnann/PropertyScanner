import { userApiSlice } from "./apiSlice";
import { GET_USERS,BLOCK_USERS,UNBLOCK_USERS } from "../config/api";
const ADMIN_URL = '/api/admin'
export const adminSlice = userApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      Adminlogin: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/adminAuth`,
          method: 'POST',
          body: data,
        }),
      }),

      blockUser: builder.mutation({
        query: (params) => ({
          url: `${BLOCK_USERS}?id=${params.id}`,
          method: 'GET',
          
        }),
      }),
      unBlockUser: builder.mutation({
        query: (params) => ({
          url: `${UNBLOCK_USERS}?id=${params.id}`,
          method: 'GET',
          
        }),
      }),

      getUsers:builder.query({
        query:()=>({
           url:`${GET_USERS}` ,
           method:'GET'

        }),
    }),
      adminLogout: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/adminLogout`,
          method: 'POST',
          body: data,
        }),
      }),
      

    }),
})


export const {
    useAdminloginMutation,
    useAdminLogoutMutation,
    useBlockUserMutation,
    useUnBlockUserMutation,
    useGetUsersQuery,
}= adminSlice
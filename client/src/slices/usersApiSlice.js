import { userApiSlice } from "./apiSlice";

const USERS_URL = '/api/users'


export const userSlice = userApiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        verifyregistration:builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/verifyRegistration`,
                method: 'POST',
                body: data,
            }),
        }),
        googleLogin: builder.mutation({
            query:(data) =>({
                url: `${USERS_URL}/googleLogin`,
                method:'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method: 'GET',
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/forgotPassword`,
              method: 'POST',
              body: data,
            }),
          }),
          verifyAndChangePassword: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/verifyAndChangePassword`,
              method: 'POST',
              body: data,
            }),
          }),
          changePassword: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/changePassword`,
              method: 'POST',
              body: data,
            }),
          }),
          updateProfile: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/updateProfile`,
                method: 'POST',
                body: data,
            }),
          }),
          UsergetProfile: builder.mutation({
            query: (query)=> ({
                url: `${USERS_URL}/getProfile?email=${query.email}&userId=${query.userId}`,
                method: 'GET',
            }),
          }),
          getUserData: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/getUserData`,
              method: 'GET',
            }),
          }),

        getUserBanner: builder.query({
          query:() => ({
            url:`${USERS_URL}/getUserBanner`,
            method: 'GET'
          })
        })
    })
})

export const{
    useLoginMutation,
    useRegisterMutation,
    useVerifyregistrationMutation,
    useGoogleLoginMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useVerifyAndChangePasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useUsergetProfileMutation,
    useGetUserDataMutation,
    useGetUserBannerQuery
} = userSlice
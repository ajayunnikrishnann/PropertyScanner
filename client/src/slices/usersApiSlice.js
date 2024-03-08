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
        otpVerify: builder.mutation({
          query: (data) => ({
              url: `${USERS_URL}/otpVerify`,
              method: 'POST',
              body: data
          }),
      }),
      resendOtp: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/resendOtp`,
            method: 'POST',
            body: data
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
          }),
        }),
        accessChat: builder.mutation({
          query: (userId) => ({
              url: `${USERS_URL}/accessChat`,
              method: 'POST',
              body: {userId}
          })
      }),
      fetchChat: builder.mutation({
          query: () => ({
              url: `${USERS_URL}/fetchChats`,
              method: 'POST'
          })
      }), 
      sendMessage: builder.mutation({
          query: (data) => ({
              url: `${USERS_URL}/sendMessage`,
              method: 'POST',
              body: data
          })
      }),
      fetchMessages: builder.mutation({
          query: (chatId) => ({
              url: `${USERS_URL}/allMessages/${chatId}`,
              method: 'GET'
          })
      }),
        checkBlock: builder.mutation({
          query: (data) => ({
              url: `${USERS_URL}/checkBlock`,
              method: 'PUT',
              body: data
          })
      }),
      fetchNotifications: builder.mutation({
        query: () => ({
            url: `${USERS_URL}/allNotifications`,
            method: 'POST'
        })
    }),
    deleteNotification: builder.mutation({
        query: (notificationId) => ({
            url: `${USERS_URL}/deleteNotification/${notificationId}`,
            method: 'DELETE'
        })
    }),
 
    })
})

export const{
    useLoginMutation,
    useRegisterMutation,
    useGoogleLoginMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useVerifyAndChangePasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useUsergetProfileMutation,
    useGetUserDataMutation,
    useGetUserBannerQuery,
    useOtpVerifyMutation,
    useResendOtpMutation,
    useCheckBlockMutation,
    useAccessChatMutation,
    useFetchChatMutation,
    useSendMessageMutation,
    useFetchMessagesMutation,
    useFetchNotificationsMutation,
    useDeleteNotificationMutation,

} = userSlice
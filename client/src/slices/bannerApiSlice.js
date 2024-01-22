import { createSlice } from "@reduxjs/toolkit";
import { userApiSlice } from "./apiSlice"; 

const BANNER_URL = '/api/admin'; // This line was assumed in my previous messages.

export const bannerSlice = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBanner: builder.mutation({
      query: (data) => ({
        url: `${BANNER_URL}/createBanner`,
        method: 'POST',
        body: data,
      }),
    }),
    getBanners: builder.query({
      query: () => {
        const url = `${BANNER_URL}/getBanners`
        return {
          url,
          method: 'GET',
        };
      },
      providesTags: (result = [], error, id) =>
        result ? [...result.map((banner) => ({ type: 'Banner', id: banner._id }))] : [{ type: 'Banner', id }],
    }),
    updateBanner: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${BANNER_URL}/updateBanner/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `${BANNER_URL}/deleteBanner/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateBannerMutation,
  useGetBannersQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerSlice;

export default bannerSlice.reducer;

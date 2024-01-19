import { CreateAPI } from "@/helpers/CreateAPI";
import {
  APIGlobalErrorHandler,
  APIGlobalResponseHandler,
} from "@/services/helper/response-helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { LoginResponse } from "@/types/login";

const SETSIS_API_URL = process.env.NEXT_PUBLIC_SETSIS_API_URL;
console.log(SETSIS_API_URL, "SETSIS_API_URL");

export function CoreAPI<T>() {
  const api = CreateAPI({
    baseURL: SETSIS_API_URL,
  });
  api.interceptors.response.use(
    APIGlobalResponseHandler,
    APIGlobalErrorHandler
  );
  return api;
}

export const API = CoreAPI();

const isTokenExpired = () => {
  const expiration = Cookies.get("expiration");
  if (!expiration) return true;
  return new Date() >= new Date(expiration);
};


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: SETSIS_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      let token = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      if (isTokenExpired()) {
        console.log("Access token expired, refreshing...")
        await API.post<LoginResponse>("/Auth/RefreshTokenLogin", { refreshToken })
        .then((data) => data)
          .then((data) => {
            Cookies.set("accessToken", data.token.accessToken);
            Cookies.set("refreshToken", data.token.refreshToken);
            Cookies.set("expiration", data.token.expiration);
          })
          .catch((err) => {
            throw err;
          });
      }

      token = Cookies.get("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/Category/GetAll`,
      providesTags: (result, error, arg) => [{ type: 'Category', id: 'LIST' }],
    }),
    createCategory: builder.mutation({
        query: (body) => ({
            url: `/Category`,
            method: "POST",
            body,
        }),
        invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation({
        query: (body) => ({
            url: `/Category`,
            method: "DELETE",
            body,
        }),
        invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation({
        query: (body) => ({
            url: `/Category`,
            method: "PUT",
            body,
        }),
        invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
});
export const { useGetAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = apiSlice;

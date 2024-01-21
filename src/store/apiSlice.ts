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


let isRefreshing = false;
let refreshSubscribers: any = [];

function subscribeTokenRefresh(cb: any) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token: any) {
  //@ts-ignore
  refreshSubscribers.map(cb => cb(token));
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: SETSIS_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      let token = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  if (isTokenExpired() && !isRefreshing) {
    isRefreshing = true;
    console.log("Access token expired, refreshing...");

    try {
      const response = await API.post("/Auth/RefreshTokenLogin", { refreshToken });
      const data = response;
      console.log(data, 'data al sana');

      Cookies.set("accessToken", data.token.accessToken);
      Cookies.set("refreshToken", data.token.refreshToken);
      Cookies.set("expiration", data.token.expiration);

      onRrefreshed(data.token.accessToken);
      isRefreshing = false;

      token = data.token.accessToken;
    } catch (err) {
      isRefreshing = false;
      throw err;
    }
  } else if (isTokenExpired() && isRefreshing) {
    await new Promise((resolve) => {
      //@ts-ignore
      subscribeTokenRefresh(newToken => {
        token = newToken;
        //@ts-ignore
        resolve();
      });
    });
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
    },
  }),
  tagTypes: ['Category', 'Product'],
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
    getAllProducts: builder.query({
        query: (pageNumber = 1) => `/Product/GetAll?PageNumber=${pageNumber}`,
        providesTags: (result, error, arg) => [{ type: 'Product', id: 'LIST' }],
    }),
    createProduct: builder.mutation({
        query: (body) => ({
            url: `/Product`,
            method: "POST",
            body,
        }),
        invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: (body) => ({
          url: `/Product`,
          method: "DELETE",
          body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
  }),
  updateProduct: builder.mutation({
    query: (body) => ({
        url: `/Product`,
        method: "PUT",
        body,
    }),
    invalidatesTags: [{ type: 'Product', id: 'LIST' }],
}),
getByCategoryId: builder.query({
  query: (pageNumber: number = 1, CategoryId: number = 326) => `/Product/GetByCategoryId?PageNumber=${pageNumber}&CategoryId=${CategoryId}`,
  providesTags: (result, error, arg) => [{ type: 'Product', id: 'LIST' }],
}),
  }),
});
export const { useGetAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useGetAllProductsQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation, useGetByCategoryIdQuery } = apiSlice;

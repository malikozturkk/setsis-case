import { CreateAPI } from "../helpers/CreateAPI";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";

import {
  APIGlobalErrorHandler,
  APIGlobalResponseHandler,
} from "./helper/response-helper";
import { LoginPayload } from "@/types/login";
import { RegisterPayload } from "@/types/register";

const SETSIS_API_URL = process.env.NEXT_PUBLIC_SETSIS_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SETSIS_API_URL,
  }),

  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (credentials) => ({
        url: "/Auth/Login",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshTokenLogin: builder.mutation({
      query: (token) => ({
        url: "/Auth/RefreshTokenLogin",
        method: "POST",
        body: token,
      }),
    }),
  }),
});

export const { useLogInMutation } = authApi;

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

export const AuthLogin = async (params: LoginPayload) => {
  return await API.post("/Auth/Login", params);
};

export const AuthRegister = async (params: RegisterPayload) => {
  return await API.post("/User", params);
};
export const GetAllCategories = async () => {
  return await API.get("/Category​/GetAll");
};

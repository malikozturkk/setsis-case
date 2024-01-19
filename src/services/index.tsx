import { CreateAPI } from "../helpers/CreateAPI";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  APIGlobalErrorHandler,
  APIGlobalResponseHandler,
} from "./helper/response-helper";
import { LoginPayload } from "@/types/login";
import { RegisterPayload } from "@/types/register";

const SETSIS_API_URL = process.env.SETSIS_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `api/v1` }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (credentials) => ({
        url: "auth-login",
        method: "POST",
        body: credentials,
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

export const RefreshTokenLogin = async (params: string) => {
  return await API.post("/Auth/RefreshTokenLogin", params);
};

export const GetAllCategories = async () => {
  return await API.get("/Category​/GetAll");
};

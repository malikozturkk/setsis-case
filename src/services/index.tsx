import { CreateAPI } from "../helpers/CreateAPI";
import {
  APIGlobalErrorHandler,
  APIGlobalResponseHandler,
} from "./helper/response-helper";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export function CoreAPI<T>() {
  const SETSIS_API_URL =
    publicRuntimeConfig?.processEnv?.SETSIS_API_URL ||
    process.env.SETSIS_API_URL;
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

export const AuthLogin = async (params: any) => {
  const { usernameOrEmail, password } = params;
  return await API.post(`"/auth/login"`, { usernameOrEmail, password });
};
